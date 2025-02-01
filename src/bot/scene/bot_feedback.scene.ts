import { Ctx, On, Scene } from 'nestjs-telegraf';
import { BotScene } from '../common/enum/bot_scene.enum';
import { FeedbackService } from '../../feedbeck/service/feedback.service';
import { actionButtonsUsersMainExistFB, actionButtonsUsersMainNoFB } from '../button/bot_admin-markup.buttons';
import { DataHears } from '../common/constants/constants';

@Scene(BotScene.FeedbackScene)
export class FeedbackScene {
    constructor(private readonly feedbackService: FeedbackService) {}

    @On('message')
    async handleFeedback(@Ctx() ctx: any) {
        const text = ctx.message.text.trim(); // Убираем лишние пробелы

        // Добавляем возможность выхода по команде "/exit"
        if (text.toLowerCase() === '/exit') {
            if (ctx.session.dontExistFeedbackInDb) {
                await ctx.reply('Вы вышли из режима отправки отзыва.', actionButtonsUsersMainNoFB);
            } else await ctx.reply('Вы вышли из режима отправки отзыва.', actionButtonsUsersMainExistFB);

            ctx.scene.state = {}; // Чистим состояние
            await ctx.scene.leave();
            return;
        }

        // Ограничение на 500 символов
        if (text.length > 500) {
            await ctx.reply('ОС не может быть длиннее 500 символов. Пожалуйста, сократите текст.');
            return;
        }

        // Проверяем, ожидает ли бот подтверждения
        if (ctx.scene.state.awaitingConfirmation) {
            if (DataHears.confirm.includes(text)) {
                const { userId, data, comment, existingFeedback } = ctx.scene.state;

                if (!userId || !data || !comment) {
                    await ctx.reply('Произошла ошибка, попробуйте снова.');
                    return;
                }

                await this.feedbackService.createOrUpdateFeedback(userId, data, comment);

                if (existingFeedback) {
                    await ctx.reply('Ваш отзыв был обновлен.', actionButtonsUsersMainExistFB);
                } else {
                    await ctx.reply('Спасибо! Ваш отзыв сохранен.', actionButtonsUsersMainNoFB);
                }

                ctx.scene.state = {}; // Чистим состояние
                await ctx.scene.leave();
                return;
            }

            if (DataHears.canceling.includes(text)) {
                const { existingFeedback } = ctx.scene.state;

                if (existingFeedback) {
                    await ctx.reply('Вы отменили редактирование ОС.', actionButtonsUsersMainExistFB);
                } else {
                    await ctx.reply('Вы отменили отправку ОС.', actionButtonsUsersMainNoFB);
                }

                ctx.scene.state = {}; // Чистим состояние
                await ctx.scene.leave();
                return;
            }

            await ctx.reply('Пожалуйста, используйте "y" для подтверждения или "n" для отмены.');
            return;
        }

        // Обрабатываем новый отзыв
        const userId = ctx.from?.id;
        const comment = ctx.message.text;
        const data = new Date().toISOString();

        if (!userId) {
            await ctx.reply('Ошибка: невозможно определить пользователя.');
            return;
        }

        const existingFeedback = await this.feedbackService.getUserFeedback(userId);

        ctx.scene.state = { userId, data, comment, existingFeedback, awaitingConfirmation: true };

        await ctx.reply('Вы хотите сохранить или редактировать отзыв? (y/n)');
    }
}
