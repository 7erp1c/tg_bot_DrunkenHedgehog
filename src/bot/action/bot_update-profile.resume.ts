import { Action, Ctx, InjectBot, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../../user/user.controller';
import { DataBatton, NameBatton } from '../common/enum/bot_actions.enum';
import { BotScene } from '../common/enum/bot_scene.enum';
import { EnField } from '../common/enum/bot_db-field.enum';

@Update()
export class BotUpdateProfile {
    constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

    @Action(DataBatton.AboutMe)
    async UpdateAboutMe(@Ctx() ctx: any) {
        await ctx.answerCbQuery();

        ctx.session.editingField = EnField.AboutMe;

        ctx.session.isAwaitingCodeUpdate = true;

        await ctx.deleteMessage();

        await ctx.reply(`Введите новый текст для поля "${NameBatton.AboutMe}":`);

        await ctx.scene.enter(BotScene.SaveTextScene);
    }

    @Action(DataBatton.Contacts)
    async UpdateContactInfo(ctx: any) {
        ctx.session.editingField = EnField.Contacts;

        ctx.session.isAwaitingCodeUpdate = true;

        await ctx.deleteMessage();

        await ctx.reply(`Введите новый текст для поля "${NameBatton.Contacts}":`);

        await ctx.scene.enter(BotScene.SaveTextScene);
    }

    @Action(DataBatton.Technologies)
    async updateTechnologies(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Technologies;

        ctx.session.isAwaitingCodeUpdate = true;

        await ctx.deleteMessage();

        await ctx.reply(`Введите новый текст для поля "${NameBatton.Technologies}":`);

        await ctx.scene.enter(BotScene.SaveTextScene);
    }

    @Action(DataBatton.Experience)
    async updateExperience(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Experience;

        ctx.session.isAwaitingCodeUpdate = true;

        await ctx.deleteMessage();

        await ctx.reply(`Введите новый текст для поля "${NameBatton.Experience}":`);

        await ctx.scene.enter(BotScene.SaveTextScene);
    }

    @Action(DataBatton.Education)
    async updateEducation(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Education;

        ctx.session.isAwaitingCodeUpdate = true;

        await ctx.deleteMessage();

        await ctx.reply(`Введите новый текст для поля "${NameBatton.Education}":`);

        await ctx.scene.enter(BotScene.SaveTextScene);
    }

    @Action(DataBatton.Lines)
    async updateProjects(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Lines;

        ctx.session.isAwaitingCodeUpdate = true;

        await ctx.deleteMessage();

        await ctx.reply(`Введите новый текст для поля "${NameBatton.Lines}":`);

        await ctx.scene.enter(BotScene.SaveTextScene);
    }

    @Action(DataBatton.Photo)
    async updatePhoto(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Photos; // Сохраняем информацию о редактируемом поле

        ctx.session.isAwaitingPhotoUpdate = true; // Устанавливаем флаг ожидания фото

        await ctx.deleteMessage();

        await ctx.reply(
            'Загрузите новое фото с подписью,где подпись будет key, отправив его в сообщении. Пример: просто отправьте фото, и подпиши.',
        );
        await ctx.scene.enter(BotScene.SavePhotoScene);
    }
}
