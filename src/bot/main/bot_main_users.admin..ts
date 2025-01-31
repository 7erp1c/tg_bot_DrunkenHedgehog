import { Action, Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from 'src/user/user.controller';
import {
    actionButtonsAdminMain,
    actionButtonsUsersMainExistFB,
    actionButtonsUsersMainNoFB,
} from 'src/bot/button/bot_admin-markup.buttons';
import { ADMIN_USER_ID, CODE_USER_LOGIN } from '../../user/dto/variables';
import { BotActions } from '../common/enum/bot_actions.enum';
import { messages } from '../../constants/messages';
import { RegistrationHandler } from '../handlers/registration_handlers';
import { FeedbackService } from '../../feedbeck/service/feedback.service';

@Update()
export class BotUsers {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly registrationHandler: RegistrationHandler,
        private readonly feedbackService: FeedbackService,
    ) {}

    @Start()
    async start(@Ctx() ctx: any) {
        const user = ctx.from;

        await ctx.deleteMessage();

        if (user.id === +ADMIN_USER_ID!) {
            // Если администратор — сразу показываем кнопки
            await ctx.sendMessage('Привет, админ!😎', actionButtonsAdminMain);
        } else {
            // Для обычных пользователей запрашиваем код
            await ctx.sendMessage(messages.welcome(user.first_name));
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
                await ctx.deleteMessage();
                await this.registrationHandler.handlerRegistration(ctx);
                // Подгружаем кнопку с учетом обратной связи
                const buttons = await this.getUserMenuWithFeedbackButton(userId);
                await ctx.sendMessage(messages.accessGranted, buttons);

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

        await ctx.sendMessage('Да к тебе никто не заходит, шо ты клацаешь😁', actionButtonsAdminMain);
    }

    async getUserMenuWithFeedbackButton(userId: number) {
        const feedback = await this.feedbackService.getUserFeedback(userId);
        if (!feedback) {
            return actionButtonsUsersMainNoFB;
        } else return actionButtonsUsersMainExistFB;
    }
}
