import { Action, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { Context } from 'src/user/user.controller';
import { UserService } from './user.service';
import { actionButtonsAdmin, actionButtonsAdminAllUsers, actionButtonsAllUsers } from 'src/app.buttons';
import { UserEntity } from './entities/user.entity';
import { IUser } from '../common/types';
import { ADMIN_USER_ID } from './dto/variables';
import { BotActions } from './dto/enum';

@Update()
export class UserBot {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly userService: UserService,
    ) {}

    _getUserFromContext(ctx: any): IUser {
        return ctx?.message?.from || ctx?.update?.callback_query?.from;
    }

    @Start()
    async start(@Ctx() ctx: any) {
        const userId = ctx.from?.id;
        console.log('userId', userId);
        console.log('ADMIN_USER_ID', ADMIN_USER_ID);
        // Приводим к строкам для корректного сравнения (если ADMIN_USER_ID - строка)
        if (userId !== parseInt(ADMIN_USER_ID!, 10)) {
            ctx.sendMessage('Меню', actionButtonsAllUsers); // кнопки для обычных пользователей
        } else {
            ctx.sendMessage('Привет, жми кнопку', actionButtonsAdmin, actionButtonsAdminAllUsers);
        }
    }

    async checkIsRegister(userId: number) {
        return !Boolean(await this.userService.findById(userId));
    }

    getUserName(user: Partial<UserEntity>) {
        if (user?.username && user.username !== 'unknown') return user.username;
        if (user?.first_name && user.first_name !== 'unknown') return user.first_name;
        if (user?.last_name && user.last_name !== 'unknown') return user.last_name;
    }

    @Action(BotActions.REGISTER)
    async onRegisterCallback(@Ctx() ctx: Context) {
        await ctx.answerCbQuery();
        // Отправляем подтверждение о том, что кнопка нажата
        await this.handleRegistration(ctx);

        await ctx.deleteMessage();
    }
    @Action(BotActions.ALL_USERS)
    async allUsersCallback(@Ctx() ctx: Context) {
        //await ctx.answerCbQuery(); // Отправляем подтверждение о том, что кнопка нажата
        await this.handlerAllUsers(ctx);
    }

    private async handlerAllUsers(@Ctx() ctx: Context) {
            const userData = this._getUserFromContext(ctx);

        if (userData?.id !== parseInt(ADMIN_USER_ID!, 10)) {
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

    private async handleRegistration(ctx: Context) {
        const userData = this._getUserFromContext(ctx);
        const admin = parseInt(ADMIN_USER_ID!, 10)
        console.log(userData);
        let resText = this.getUserName(userData);

        if (await this.checkIsRegister(userData?.id)) {
            const user = await this.userService.create(userData);
            resText += user ? ' Привет' : ' - произошла ошибка';
        } else resText += ' Уже зарегистрирован';

        await ctx.editMessageReplyMarkup(undefined);

        if (userData?.id === admin) {
            // Если администратор, показываем кнопку "Все пользователи"
            await ctx.reply('Вы успешно зарегистрировались! Теперь у вас есть доступ к информации о пользователях.',
                 Markup.inlineKeyboard([
                    Markup.button.callback('Информация о пользователях', BotActions.ALL_USERS),
                ]),
            );
        } else ctx.sendMessage(resText!);

        }

}
