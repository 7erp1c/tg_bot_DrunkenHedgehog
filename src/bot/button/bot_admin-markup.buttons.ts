import { Markup } from 'telegraf';
import { BotActions, DataBatton, NameBatton } from '../common/enum/bot_actions.enum';
import {
    getButtonResumeAboutMe,
    getButtonResumeContact,
    getButtonResumeEducation,
    getButtonResumeExperience,
    getButtonResumeLines,
    getButtonResumePhoto,
    getButtonResumeTechnologies,
    getMainButtonResumeInfo,
} from './constants/bot_get-constans.button';
import {
    adminButtonUpdateAboutMe,
    adminButtonUpdateContact,
    adminButtonUpdateEducation,
    adminButtonUpdateExperience,
    adminButtonUpdateLines,
    adminButtonUpdatePhoto,
    adminButtonUpdateTechnologies,
} from './constants/bot_update-constants.buttons';

const buttonResume = Markup.button.callback('Регистрация', BotActions.REGISTER);
//MAIN MENU
const adminButtonAllUsers = Markup.button.callback(BotActions.ALL_USERS, BotActions.ALL_USERS);

const adminButtonCreateResume = Markup.button.callback(NameBatton.UpdateResume, DataBatton.UpdateResume);

const adminButtonBack = Markup.button.callback(NameBatton.BackToMain, DataBatton.BackToMain); //кнопка назад в основное  меню

export const actionButtonsResume: any = Markup.inlineKeyboard([buttonResume], {
    columns: 1,
});

export const actionButtonsAdminOne: any = Markup.inlineKeyboard(
    [adminButtonAllUsers, adminButtonCreateResume, getMainButtonResumeInfo],
    {
        columns: 2,
    },
);

export const actionButtonsAdminTwo: any = Markup.inlineKeyboard(
    [
        adminButtonUpdateAboutMe,
        adminButtonUpdateContact,
        adminButtonUpdateLines,
        adminButtonUpdateTechnologies,
        adminButtonUpdateExperience,
        adminButtonUpdateEducation,
        adminButtonUpdatePhoto,
        adminButtonBack,
    ],
    {
        columns: 3,
    },
);

export const actionButtonsGetThree = Markup.inlineKeyboard(
    [
        getButtonResumeAboutMe,
        getButtonResumeContact,
        getButtonResumeLines,
        getButtonResumeTechnologies,
        getButtonResumeExperience,
        getButtonResumeEducation,
        getButtonResumePhoto,
        adminButtonBack,
    ],
    {
        columns: 3,
    },
);
