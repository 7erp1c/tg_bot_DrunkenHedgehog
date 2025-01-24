import { Markup } from 'telegraf';
import { BotActions } from './user/dto/enum';

const bottonRegisteration = Markup.button.callback('Регистрация', BotActions.REGISTER);

const battonAllUsers = Markup.button.callback(BotActions.ALL_USERS, BotActions.ALL_USERS);

  export const actionButtonsAllUsers:any = Markup.inlineKeyboard(
  [
    bottonRegisteration
  ],
  {
    columns: 2,
  },
);

export const actionButtonsAdmin:any  = Markup.inlineKeyboard(
  [
    bottonRegisteration
  ],
  {
    columns: 1,
  },
);

export const actionButtonsAdminAllUsers:any = Markup.keyboard([
  battonAllUsers
],{
  columns: 1,
})
