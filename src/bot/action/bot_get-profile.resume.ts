import { Action, Ctx, Update } from 'nestjs-telegraf';
import { DataBatton, NameBatton } from '../common/enum/bot_actions.enum';
import { BotScene } from '../common/enum/bot_scene.enum';
import { EnField } from '../common/enum/bot_db-field.enum';
import { GetResumeService } from '../../resume/service/get-resume.service';
import { actionButtonsGetThree } from '../button/bot_admin-markup.buttons';

@Update()
export class BotGetProfile {
    constructor(private readonly get: GetResumeService) {}

    @Action(DataBatton.GetAboutMe)
    async UpdateAboutMe(@Ctx() ctx: any) {
        await ctx.answerCbQuery();

        ctx.session.editingField = EnField.AboutMe;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        // const aboutMe = await this.get.getResumeInfo(EnField.AboutMe);
        await ctx.editMessageText(`${'aboutMe'}`);
        await ctx.reply('Нажмите кнопку🙂, чтобы получить информацию обо мне:', actionButtonsGetThree);
    }

    @Action(DataBatton.GetContacts)
    async UpdateContactInfo(ctx: any) {
        ctx.session.editingField = EnField.Contacts;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const contacts = await this.get.getResumeInfo(EnField.Contacts);
        await ctx.editMessageText(`Мои контакты: ${contacts}`);
        await ctx.reply('Нажмите кнопку😊, чтобы получить информацию обо мне:', actionButtonsGetThree);
    }

    @Action(DataBatton.GetTechnologies)
    async updateTechnologies(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Technologies;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const technologies = await this.get.getResumeInfo(EnField.Technologies);
        await ctx.editMessageText(`Технологии: ${technologies}`);
        await ctx.reply('Нажмите кнопку🤗, чтобы получить информацию обо мне:', actionButtonsGetThree);
    }

    @Action(DataBatton.GetExperience)
    async updateExperience(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Experience;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const experience = await this.get.getResumeInfo(EnField.AboutMe);
        await ctx.editMessageText(`Опыт: ${experience}`);
        await ctx.reply('Нажмите кнопку😏, чтобы получить информацию обо мне:', actionButtonsGetThree);
    }

    @Action(DataBatton.GetEducation)
    async updateEducation(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Education;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const education = await this.get.getResumeInfo(EnField.Education);
        await ctx.editMessageText(`Образование: ${education}`);
        await ctx.reply('Нажмите кнопку😉, чтобы получить информацию обо мне:', actionButtonsGetThree);
    }

    @Action(DataBatton.GetLines)
    async updateProjects(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Lines;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const experience = await this.get.getResumeInfo(EnField.Lines);
        await ctx.editMessageText(`Ccылки: ${experience}`);
        await ctx.reply('Нажмите кнопку🦝, чтобы получить информацию обо мне:', actionButtonsGetThree);
    }

    @Action(DataBatton.GetPhoto)
    async updatePhoto(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Photos;

        ctx.session.isAwaitingPhotoUpdate = true;

        await ctx.deleteMessage();

        const photos = await this.get.getResumeInfo(EnField.Photos);
        await ctx.editMessageText(`${photos}`);
        await ctx.reply('Нажмите кнопку😄, чтобы получить информацию обо мне:', actionButtonsGetThree);
    }
}
