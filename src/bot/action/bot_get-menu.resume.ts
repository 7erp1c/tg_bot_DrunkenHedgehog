import { Action, Ctx, Update } from 'nestjs-telegraf';
import { DataBatton } from '../common/enum/bot_actions.enum';
import { Context } from 'telegraf';
import { actionButtonsGetThree } from '../button/bot_admin-markup.buttons';

@Update()
export class GetResumeActions {
    @Action(DataBatton.GetResumeInfo)
    async getResume(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText('Нажмите кнопку, чтобы получить информацию обо мне🙃:', actionButtonsGetThree);
        } catch (error) {
            console.error('Ошибка в обработчике get_resume:', error);
        }
    }
}
