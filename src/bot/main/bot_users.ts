import { Action, Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from 'src/user/user.controller';
import { actionButtonsAdminOne, actionButtonsResume } from 'src/app.buttons';
import { ADMIN_USER_ID, CODE_USER_LOGIN } from '../../user/dto/variables';
import { BotActions } from '../common/enum/bot_actions.enum';
import { messages } from '../../constants/messages';
import { RegistrationHandler } from '../handlers/registration_handlers';
import { login } from 'telegraf/typings/button';

@Update()
export class BotUsers {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly registrationHandler: RegistrationHandler,
    ) {}

    @Start()
    async start(@Ctx() ctx: any) {
        const user = ctx.from;

        if (user.id === +ADMIN_USER_ID!) {
            // Если администратор — сразу показываем кнопки
            await ctx.sendMessage('Привет, админ!😎', actionButtonsAdminOne);

            // this.bot.on('callback_query', async (ctx) => {
            //     console.log('Callback data:', ctx.callbackQuery); // Покажет данные callback'а
            //     await ctx.answerCbQuery();
            // });
            //const resumeExists = await this.resumeRepository.findOne({ where: { id: 1 } });
        } else {
            // Для обычных пользователей запрашиваем код
            await ctx.sendMessage(messages.welcome(user.first_name));
            console.log(ctx.session);
            ctx.session.isAwaitingCode = true; // Устанавливаем состояние ожидания кода
        }
    }

    @On('text')
    async onMessage(@Ctx() ctx: any) {
        const userId = ctx.from?.id;

        if (userId === +ADMIN_USER_ID!) return;

        if (ctx.session.isAwaitingCode) {
            const enteredCode = ctx.message.text;
            const validCode = CODE_USER_LOGIN!;

            if (enteredCode === validCode) {
                // Если код правильный
                await this.registrationHandler.handlerRegistration(ctx);
                await ctx.sendMessage(messages.accessGranted, actionButtonsResume);
                ctx.session.isAwaitingCode = false; // Сбрасываем состояние
            } else {
                // Если код неверный
                await ctx.sendMessage(messages.invalidCode);
            }
        } else {
            // Если пользователь пишет без ожидания кода
            await ctx.sendMessage(messages.startCommand);
        }
    }

    @Action(BotActions.ALL_USERS)
    async allUsersCallback(@Ctx() ctx: Context) {
        await ctx.answerCbQuery();

        await ctx.editMessageReplyMarkup(undefined); // убираем кнопки

        await this.registrationHandler.handlerAllUsers(ctx);

        await ctx.sendMessage('Да к тебе никто не заходит, шо ты клацаешь😁', actionButtonsAdminOne);
    }
}
