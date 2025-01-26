import { Injectable } from '@nestjs/common';
import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { actionButtonsAdminOne, actionButtonsAdminTwo } from '../../app.buttons';
import { DataBatton } from '../common/enum/bot_actions.enum';

@Update()
export class ResumeActions {
    constructor(/*private readonly resumeService: ResumeService*/) {}

    @Action(DataBatton.UpdateResume)
    async updateResume(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText('Выберите поле, которое хотите редактировать:', actionButtonsAdminTwo);
        } catch (error) {
            console.error('Ошибка в обработчике create_resume:', error);
        }
    }

    @Action(DataBatton.BackToMain)
    async backToMainMenu(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText('Нус, определился?', actionButtonsAdminOne);
        } catch (error) {
            console.error('Ошибка при возвращении в главное меню:', error);
        }
    }

    @Action(DataBatton.BackToUpdateResumeMenu)
    async backToUpdateResumeMenu(@Ctx() ctx: Context): Promise<void> {
        try {
            await ctx.editMessageText('Выберите поле, которое хотите редактировать:', actionButtonsAdminTwo);
        } catch (error) {
            console.error('Ошибка при возвращении в меню:', error);
        }
    }
}
