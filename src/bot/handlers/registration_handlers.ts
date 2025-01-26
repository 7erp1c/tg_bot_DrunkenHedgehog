import { Ctx, InjectBot } from 'nestjs-telegraf';
import { Context } from '../../user/user.controller';
import { ADMIN_USER_ID } from '../../user/dto/variables';
import { Markup, Telegraf } from 'telegraf';
import { BotActions } from '../common/enum/bot_actions.enum';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/entities/user.entity';
import { IUser } from '../../common/types';
import { login } from 'telegraf/typings/button';

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

    getUserName(user: Partial<UserEntity>) {
        if (user?.username && user.username !== 'unknown') return user.username;
        if (user?.first_name && user.first_name !== 'unknown') return user.first_name;
        if (user?.last_name && user.last_name !== 'unknown') return user.last_name;
    }

    async handlerAllUsers(@Ctx() ctx: Context) {
        const userData = this._getUserFromContext(ctx);

        if (userData?.id !== +ADMIN_USER_ID!) {
            await ctx.sendMessage('У вас нет прав для выполнения этой команды.');
            return;
        }

        const users = await this.userService.getAll();

        ctx.sendMessage(
            users
                .map(
                    (user) =>
                        `${this.getUserName(user)} (дата регистрации ${new Date(user.createdAt).toLocaleString()})`,
                )
                .join('\n'),
        );
    }

    async handlerRegistration(ctx: Context) {
        try {
            const userData = this._getUserFromContext(ctx);

            const isNewUser = await this.checkIsRegister(userData?.id);
            if (isNewUser) {
                const save = await this.userService.create(userData);
            }
        } catch (error) {
            await ctx.sendMessage('Произошла ошибка при регистрации. Попробуйте позже.');
        }
    }
}
