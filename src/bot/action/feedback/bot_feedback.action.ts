import { Action, Ctx, Update } from 'nestjs-telegraf';
import { FeedbackService } from '../../../feedbeck/service/feedback.service';
import { BotScene } from '../../common/enum/bot_scene.enum';
import { DataButton } from '../../common/enum/bot_actions.enum';

@Update()
export class FeedbackAction {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Action(DataButton.FeedBack)
    async setFeedback(@Ctx() ctx: any) {
        const userId = ctx.from?.id;
        await ctx.deleteMessage();
        const feedback = await this.feedbackService.getUserFeedback(userId);
        if (!feedback) {
            ctx.session.dontExistFeedbackInDb = true;
            await ctx.reply(`Отправьте текст сообщением:\nДля отмены введите: <code>/exit</code>`, {
                parse_mode: 'HTML',
            });
        } else
            await ctx.reply(`Отредактируйте вашу ОС:\n${feedback.comment}\n\nДля отмены введите: <code>/exit</code>`, {
                parse_mode: 'HTML',
            });

        await ctx.scene.enter(BotScene.FeedbackScene);
    }
}
