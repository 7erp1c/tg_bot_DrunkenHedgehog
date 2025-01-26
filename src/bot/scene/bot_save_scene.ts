import { Ctx, On, Scene } from 'nestjs-telegraf';
import { BotScene } from '../common/enum/bot_scene.enum';
import { actionButtonsAdminTwo } from '../../app.buttons';

@Scene(BotScene.SaveTextScene)
export class UpdateScene {
    @On('text')
    async handleText(@Ctx() ctx: any) {
        if ('text' in ctx.message) {
            const textInput = ctx.message.text;

            console.log('textInput', textInput); // Текст, который ввел пользователь

            // Проверяем, находится ли пользователь на этапе подтверждения
            if (ctx.session.awaitingConfirmation) {
                // Обрабатываем ответ пользователя
                if (textInput.toLowerCase() === 'yes') {
                    // Если пользователь подтвердил (Yes)
                    //await this.saveDataToDatabase(ctx.session.editingField, ctx.session.tempInput); // Сохранение в базу
                    await ctx.reply('Данные успешно сохранены!');
                    await ctx.reply('Выберите поле, которое хотите редактировать:', actionButtonsAdminTwo);
                } else if (textInput.toLowerCase() === 'no') {
                    // Если пользователь отказался (No)
                    await ctx.reply('Изменение данных отменено.');
                    await ctx.editMessageText('Выберите поле, которое хотите редактировать:', actionButtonsAdminTwo);
                } else {
                    // Если пользователь ввел некорректный ответ
                    await ctx.reply('Пожалуйста, ответьте "yes" или "no".');
                    return;
                }

                // Сбрасываем флаги после обработки
                ctx.session.awaitingConfirmation = false;
                ctx.session.tempInput = undefined;

                return;
            }

            // Проверяем, редактирует ли пользователь какое-либо поле
            if (ctx.session.editingField) {
                const field = ctx.session.editingField;

                // Сохраняем временно введенный текст в сессию
                ctx.session.tempInput = textInput;

                // Запрашиваем подтверждение
                await ctx.reply(
                    `Вы хотите сохранить следующие данные для поля "${field}": "${textInput}"?\nОтветьте "yes" для подтверждения или "no" для отмены.`,
                );

                // Устанавливаем флаг ожидания подтверждения
                ctx.session.awaitingConfirmation = true;
            } else {
                await ctx.reply('Нажмите на кнопку, чтобы выбрать поле для редактирования.');
            }
        } else {
            await ctx.reply('Ожидается текстовое сообщение.');
        }
    }
}
