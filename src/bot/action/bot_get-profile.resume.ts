import { Action, Ctx, Update } from 'nestjs-telegraf';
import { DataBatton } from '../common/enum/bot_actions.enum';
import { EnField } from '../common/enum/bot_db-field.enum';
import { GetResumeService } from '../../resume/service/get-resume.service';
import {
    actionButtonsGetLinks,
    actionButtonsGetResume,
    actionButtonsGetResumeUsers,
} from '../button/bot_admin-markup.buttons';
import { adminId } from '../../constants/messages';

@Update()
export class BotGetProfile {
    constructor(private readonly get: GetResumeService) {}

    @Action(DataBatton.GetAboutMe)
    async UpdateAboutMe(@Ctx() ctx: any) {
        await ctx.answerCbQuery();

        ctx.session.editingField = EnField.AboutMe;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const aboutMe = await this.get.getResumeInfo(EnField.AboutMe);
        await ctx.reply(`О себе:\n${aboutMe}`, { parse_mode: 'HTML' });
        const userId = ctx.from?.id;

        if (userId != adminId) {
            await ctx.reply('Нажмите кнопку, чтобы получить информацию обо мне:', actionButtonsGetResumeUsers);
        } else await ctx.reply('get resume😈:', actionButtonsGetResume);
        ctx.session.isAwaitingCodeGet = false;
    }

    @Action(DataBatton.GetContacts)
    async UpdateContactInfo(ctx: any) {
        ctx.session.editingField = EnField.Contacts;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const contacts = await this.get.getResumeInfo(EnField.Contacts);
        await ctx.reply(`Контакты:\n${contacts}`, { parse_mode: 'HTML' });
        const userId = ctx.from?.id;

        if (userId != adminId) {
            await ctx.reply('Нажмите кнопку, чтобы получить информацию обо мне:', actionButtonsGetResumeUsers);
        } else await ctx.reply('get resume😈:', actionButtonsGetResume);
        ctx.session.isAwaitingCodeGet = false;
    }
    //ok
    @Action(DataBatton.GetTechnologies)
    async updateTechnologies(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Technologies;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const technologies = await this.get.getResumeInfo(EnField.Technologies);
        await ctx.reply(
            `[Технологии](https://it-incubator.io/education/back-end#stack-of-technologies):\n*${technologies}*`,
            { parse_mode: 'Markdown', disable_web_page_preview: true },
        );
        const userId = ctx.from?.id;

        if (userId != adminId) {
            await ctx.reply('Нажмите кнопку, чтобы получить информацию обо мне:', actionButtonsGetResumeUsers);
        } else await ctx.reply('get resume😈:', actionButtonsGetResume);
        ctx.session.isAwaitingCodeGet = false;
    }

    @Action(DataBatton.GetExperience)
    async updateExperience(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Experience;

        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const experience = await this.get.getResumeInfo(EnField.Experience);
        await ctx.reply(`Опыт:\n${experience}`, { parse_mode: 'HTML' });
        const userId = ctx.from?.id;

        if (userId != adminId) {
            await ctx.reply('Нажмите кнопку, чтобы получить информацию обо мне:', actionButtonsGetResumeUsers);
        } else await ctx.reply('get resume😈:', actionButtonsGetResume);
        ctx.session.isAwaitingCodeGet = false;
    }

    @Action(DataBatton.GetEducation)
    async updateEducation(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Education;
        console.log(EnField.Education);
        ctx.session.isAwaitingCodeGet = true;

        await ctx.deleteMessage();

        const education = await this.get.getResumeInfo(EnField.Education);
        await ctx.reply(`Образование:\n${education}`, { parse_mode: 'HTML' });
        const userId = ctx.from?.id;

        if (userId != adminId) {
            await ctx.reply('Нажмите кнопку, чтобы получить информацию обо мне:', actionButtonsGetResumeUsers);
        } else await ctx.reply('get resume😈:', actionButtonsGetResume);
        ctx.session.isAwaitingCodeGet = false;
    }

    @Action(DataBatton.GetLines)
    async updateProjects(@Ctx() ctx: any) {
        ctx.session.isAwaitingGetLinks = true;

        await ctx.deleteMessage();

        await ctx.reply('Нажмите кнопку, чтобы перейти по ссылке:', actionButtonsGetLinks);

        ctx.session.isAwaitingGetLinks = false;
    }

    @Action(DataBatton.GetPhoto)
    async updatePhoto(@Ctx() ctx: any) {
        ctx.session.editingField = EnField.Photos;

        ctx.session.isAwaitingPhotoUpdate = true;

        await ctx.deleteMessage();

        const photoUrl = await this.get.getResumeInfo(EnField.Photos);
        await ctx.replyWithPhoto(photoUrl);
        const userId = ctx.from?.id;

        if (userId != adminId) {
            await ctx.reply('Нажмите кнопку, чтобы получить информацию обо мне:', actionButtonsGetResumeUsers);
        } else await ctx.reply('get resume😈:', actionButtonsGetResume);
        ctx.session.isAwaitingCodeGet = false;
    }
}
