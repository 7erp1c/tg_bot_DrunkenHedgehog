import { Markup } from 'telegraf';
import { ReplyKeyboardMarkup } from '@telegraf/types';

// @ts-ignore
export const actionButtons: Markup<ReplyKeyboardMarkup> = Markup.keyboard(
  [
    Markup.button.callback('Регистрация', 'register'),
    Markup.button.callback('Инфа о пользователях', 'users'),
  ],
  {
    columns: 2,
  },
);
// // @ts-ignore
// export const actionButtonsAdmin: Markup<ReplyKeyboardMarkup> = Markup.keyboard(
//   [
//     Markup!.button.callback('Регистрация😨', 'register'),
//     Markup!.button.callback('Инфа о пользователях', 'users'),
//   ],
//   {
//     columns: 1,
//   },
// );
