import { Action, Ctx, Update } from 'nestjs-telegraf';
import { FeedbackService } from '../../../feedbeck/service/feedback.service';
import { BotScene } from '../../common/enum/bot_scene.enum';

@Update()
export class FeedbackAction {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Action('feedback_os')
    async setFeedback(@Ctx() ctx: any) {
        const userId = ctx.from?.id;
        await ctx.deleteMessage();
        const feedback = await this.feedbackService.getUserFeedback(userId);
        if (!feedback) {
            await ctx.reply('Отправьте текст сообщением: ');
        } else
            await ctx.reply(
                `
            Отредактируйте вашу ОС:
          ${feedback.comment}
          `,
            );

        await ctx.scene.enter(BotScene.FeedbackScene);
    }
}
