import { Ctx, On, Scene } from 'nestjs-telegraf';
import { RegistrationHandler } from '../handlers/registration_handlers';
import { BotScene } from '../common/enum/bot_scene.enum';
import { actionButtonsAdminMain } from '../button/bot_admin-markup.buttons';

@Scene(BotScene.GetUsersInfoScene)
export class GetUsersScene {
    constructor(private readonly handler: RegistrationHandler) {}

    @On('message')
    async handleSearchChoice(@Ctx() ctx: any) {
        const text = ctx.message.text.trim().toLowerCase();

        // Если ожидаем ответ на вопрос о поиске по ID
        if (ctx.scene.state.awaitingIdSearch) {
            if (text === 'y') {
                await ctx.sendMessage(
                    'Пожалуйста, введите ID пользователя для поиска или отправьте "/exit" для выхода.',
                );
                ctx.scene.state.awaitingUserId = true;
                ctx.scene.state.awaitingIdSearch = false;
                return;
            }

            if (text === 'n') {
                await this.handler.handlerAllUsers(ctx);
                await ctx.scene.leave(); // Завершаем сцену после выполнения
                return;
            }

            await ctx.sendMessage(
                'Пожалуйста, ответьте "y" для поиска по ID или "n" для получения всех пользователей.',
            );
            return;
        }

        // Если ожидаем ID пользователя
        if (ctx.scene.state.awaitingUserId) {
            if (text === '/exit') {
                await ctx.sendMessage('Выход из режима поиска по ID.', actionButtonsAdminMain);
                await ctx.scene.leave(); // Завершаем сцену
                return;
            }

            const userId = parseInt(text, 10);
            if (isNaN(userId)) {
                await ctx.sendMessage(
                    'Это не действительный ID. Введите ID пользователя или отправьте "/exit" для выхода.',
                );
                return;
            }

            // Поиск пользователя и отправка информации
            await this.handler.sendUserById(ctx, userId);
            await ctx.sendMessage('Вернул тебе по ID', actionButtonsAdminMain);
            await ctx.scene.leave(); // Завершаем сцену после выполнения
        }
    }
}
