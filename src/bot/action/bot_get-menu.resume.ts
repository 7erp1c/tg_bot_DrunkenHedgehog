import { Action, Ctx, Update } from 'nestjs-telegraf';
import { DataBatton } from '../common/enum/bot_actions.enum';
import { Context } from 'telegraf';
import {
    actionButtonsGetResume,
    actionButtonsGetResumeUsers,
    actionButtonsUsersMainNoFB,
} from '../button/bot_admin-markup.buttons';
import { LinksEnum } from '../common/enum/bot_actions-links.enum';
import { adminId } from '../../constants/messages';

@Update()
export class GetResumeActions {
    @Action(DataBatton.GetResumeInfo)
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

    @Action(DataBatton.GetResumeForUsers)
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

    @Action(DataBatton.BackToMainMenuUsers)
    async beckResumeUsers(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText(
                `
            Нажмите кнопку "Резюме", чтобы получить информацию обо мне.
            Вы можете оставить ОС.
               `,
                actionButtonsUsersMainNoFB,
            );
        } catch (error) {
            console.error('Ошибка в обработчике beck_resume:', error);
        }
    }
}
