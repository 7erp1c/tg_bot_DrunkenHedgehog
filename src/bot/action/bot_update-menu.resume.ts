import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { actionButtonsAdminMain, actionButtonsAdminUpdateResume } from '../button/bot_admin-markup.buttons';
import { DataBatton } from '../common/enum/bot_actions.enum';

@Update()
export class ResumeActions {
    @Action(DataBatton.UpdateResume)
    async updateResume(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText('Выберите поле, которое хотите редактировать:', actionButtonsAdminUpdateResume);
        } catch (error) {
            console.error('Ошибка в обработчике create_resume:', error);
        }
    }

    @Action(DataBatton.BackToMain)
    async backToMainMenu(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText('Нус, определился?', actionButtonsAdminMain);
        } catch (error) {
            console.error('Ошибка при возвращении в главное меню:', error);
        }
    }

    @Action(DataBatton.BackToUpdateResumeMenu)
    async backToUpdateResumeMenu(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText('Выберите поле, которое хотите редактировать:', actionButtonsAdminUpdateResume);
        } catch (error) {
            console.error('Ошибка при возвращении в меню:', error);
        }
    }
}
