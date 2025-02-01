import { Action, Ctx, Update } from 'nestjs-telegraf';
import { DataButton } from '../common/enum/bot_actions.enum';
import { Context } from 'telegraf';
import {
    actionButtonsGetResume,
    actionButtonsGetResumeUsers,
    actionButtonsUsersMainExistFB,
    actionButtonsUsersMainNoFB,
} from '../button/bot_admin-markup.buttons';
import { LinksEnum } from '../common/enum/bot_actions-links.enum';
import { adminId, messages } from '../../constants/messages';
import { FeedbackService } from '../../feedbeck/service/feedback.service';

@Update()
export class GetResumeActions {
    constructor(private feedback: FeedbackService) {}
    @Action(DataButton.GetResumeInfo)
    async getResume(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText('Нажмите кнопку, чтобы получить информацию обо мне🙃:', actionButtonsGetResume);
        } catch (error) {
            console.error('Ошибка в обработчике get_resume:', error);
        }
    }

    @Action(LinksEnum.resumeBeck)
    async beckResume(@Ctx() ctx: Context): Promise<void> {
        try {
            const userId = ctx.from?.id;

            if (userId != adminId) {
                await ctx.editMessageText(
                    'Нажмите кнопку "Резюме", чтобы получить информацию обо мне:',
                    actionButtonsGetResumeUsers,
                );
            } else await ctx.editMessageText('get resume😈:', actionButtonsGetResume);
        } catch (error) {
            console.error('Ошибка в обработчике beck_resume:', error);
        }
    }

    @Action(DataButton.GetResumeForUsers)
    async getResumeUsers(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText(
                'Нажмите кнопку, чтобы получить информацию обо мне:',
                actionButtonsGetResumeUsers,
            );
        } catch (error) {
            console.error('Ошибка в обработчике get_resume:', error);
        }
    }

    @Action(DataButton.BackToMainMenuUsers)
    async beckResumeUsers(@Ctx() ctx: Context): Promise<void> {
        try {
            const userId = ctx.from?.id;
            const findFeedback = await this.feedback.getUserFeedback(userId!);
            if (findFeedback) {
                await ctx.editMessageText(messages.accessGrantedBackExistFeedBack, actionButtonsUsersMainExistFB);
            } else await ctx.editMessageText(messages.accessGrantedBack, actionButtonsUsersMainNoFB);
        } catch (error) {
            console.error('Ошибка в обработчике beck_resume:', error);
        }
    }
}
