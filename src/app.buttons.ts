import { Markup } from 'telegraf';
import { BotActions, DataBatton, NameBatton } from './bot/common/enum/bot_actions.enum';

const bottonResume = Markup.button.callback('Регистрация', BotActions.REGISTER);

const adminBattonAllUsers = Markup.button.callback(BotActions.ALL_USERS, BotActions.ALL_USERS);

const adminbBattonCreateResume = Markup.button.callback(NameBatton.UpdateResume, DataBatton.UpdateResume);

const adminbBattonBack = Markup.button.callback(NameBatton.BackToMain, DataBatton.BackToMain); //кнопка назад в основное  меню

const adminbBattonBackToUpdateMeny = Markup.button.callback(
    NameBatton.BackToUpdateResumeMenu,
    DataBatton.BackToUpdateResumeMenu,
); //кнопка назад в меню update

const adminbBattonUpdateAboutMe = Markup.button.callback(NameBatton.AboutMe, DataBatton.AboutMe);

const adminbBattonUpdateContact = Markup.button.callback(NameBatton.Contacts, DataBatton.Contacts);

const adminbBattonUpdateLines = Markup.button.callback(NameBatton.Lines, DataBatton.Lines);

const adminbBattonUpdateTechnologies = Markup.button.callback(NameBatton.Technologies, DataBatton.Technologies);

const adminbBattonUpdateExperience = Markup.button.callback(NameBatton.Experience, DataBatton.Experience);

const adminbBattonUpdateeDucation = Markup.button.callback(NameBatton.Education, DataBatton.Education);

const adminbBattonUpdatePhoto = Markup.button.callback(NameBatton.Photo, DataBatton.Photo);

export const actionButtonsResume: any = Markup.inlineKeyboard([bottonResume], {
    columns: 1,
});

export const actionButtonsAdminOne: any = Markup.inlineKeyboard([adminBattonAllUsers, adminbBattonCreateResume], {
    columns: 2,
});

export const actionButtonsAdminTwo: any = Markup.inlineKeyboard(
    [
        adminbBattonUpdateAboutMe,
        adminbBattonUpdateContact,
        adminbBattonUpdateLines,
        adminbBattonUpdateTechnologies,
        adminbBattonUpdateExperience,
        adminbBattonUpdateeDucation,
        adminbBattonUpdatePhoto,
        adminbBattonBack,
    ],
    {
        columns: 3,
    },
);
