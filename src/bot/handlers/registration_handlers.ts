import { Ctx, InjectBot } from 'nestjs-telegraf';
import { Context } from '../../user/user.controller';
import { ADMIN_USER_ID } from '../../user/dto/variables';
import { Telegraf } from 'telegraf';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { IUser } from '../../common/types';
import { actionButtonsAdminMain } from '../button/bot_admin-markup.buttons';

@Injectable()
export class RegistrationHandler {
    constructor(
        private readonly userService: UserService,
        @InjectBot() private readonly bot: Telegraf<Context>,
    ) {}

    async checkIsRegister(userId: number) {
        const userExists = await this.userService.findById(userId);
        return !userExists; // Возвращает true, если пользователь НЕ зарегистрирован
    }

    _getUserFromContext(ctx: any): IUser {
        return ctx?.message?.from || ctx?.update?.callback_query?.from;
    }

    async handlerAllUsers(@Ctx() ctx: any) {
        const userData = this._getUserFromContext(ctx);

        if (userData?.id !== +ADMIN_USER_ID!) {
            await ctx.sendMessage('У вас нет прав для выполнения этой команды.');
            return;
        }

        const usersOrUser = await this.userService.getUsersOrGetUserById();

        // Приводим к массиву, если вернулся один пользователь
        const users = Array.isArray(usersOrUser) ? usersOrUser : [usersOrUser];

        if (!users.length) {
            await ctx.sendMessage('Пользователи не найдены.');
            return;
        }

        const message = users.map((user) => this.formatUserMessage(user)).join('\n\n');
        await ctx.sendMessage(message, { parse_mode: 'HTML' });
        await ctx.sendMessage('Привет, админ!😎', actionButtonsAdminMain);
    }

    async sendUserById(@Ctx() ctx: any, userId: number) {
        const user = await this.userService.getUsersOrGetUserById(userId);

        if (!user) {
            await ctx.sendMessage('Пользователь с таким ID не найден.');
            return;
        }

        await ctx.sendMessage(this.formatUserMessage(user), { parse_mode: 'HTML' });
    }

    formatUserMessage(user: any): string {
        const userName = `<b>${this.escapeHtml(user.first_name)}</b>`;
        const userId = `ID: <code>${user.id}</code>`;
        const registrationDate = `<i>${this.escapeHtml(new Date(user.createdAt).toLocaleString())}</i>`;
        const comment = user.feedback?.comment ? `<b>ОС:</b>\n${this.escapeHtml(user.feedback.comment)}` : '';
        const updateDate = user.feedback?.updateDate
            ? `<i>Дата обновления: ${this.escapeHtml(new Date(user.feedback.updateDate).toLocaleString())}</i>`
            : '';

        return `${userName} ${userId} ${registrationDate}\n${comment}\n${updateDate}`;
    }

    escapeHtml(text: string): string {
        return text.replace(/[&<>'"]/g, (match) => {
            const escapeMap: Record<string, string> = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;',
            };
            return escapeMap[match];
        });
    }

    async handlerRegistration(ctx: Context) {
        try {
            const userData = this._getUserFromContext(ctx);

            const isNewUser = await this.checkIsRegister(userData?.id);
            if (isNewUser) {
                await this.userService.create(userData);
            }
        } catch (error) {
            await ctx.sendMessage('Произошла ошибка при регистрации. Попробуйте позже.');
        }
    }
}
