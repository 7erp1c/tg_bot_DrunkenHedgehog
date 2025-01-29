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
    getMainButtonResumeInfoUsers,
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
import {
    linkCodeWars,
    linkFreeCodeCamp,
    linkGitHub,
    linkItIncubator,
    linkTg,
    linkUniversity,
    linkVk,
    linksButtonBeck,
} from './constants/bot_links-constants.button';
import { LinksEnum } from '../common/enum/bot_actions-links.enum';

const buttonResume = Markup.button.callback('Регистрация', BotActions.REGISTER);
//MAIN MENU
const adminButtonAllUsers = Markup.button.callback(BotActions.ALL_USERS, BotActions.ALL_USERS);

const adminButtonCreateResume = Markup.button.callback(NameBatton.UpdateResume, DataBatton.UpdateResume);

const adminButtonBack = Markup.button.callback(NameBatton.BackToMain, DataBatton.BackToMain); //кнопка назад в основное меню

const userButtonBackGetResume = Markup.button.callback(NameBatton.BackToMain, DataBatton.BackToMainMenuUsers); //кнопка назад в основное меню users<=get resume

export const actionButtonsAdminMain: any = Markup.inlineKeyboard(
    [adminButtonAllUsers, adminButtonCreateResume, getMainButtonResumeInfo],
    {
        columns: 2,
    },
);
//UPDATE RESUME ADMIN
export const actionButtonsAdminUpdateResume: any = Markup.inlineKeyboard(
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
//GET RESUME ADMIN
export const actionButtonsGetResume = Markup.inlineKeyboard(
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
//GET LINKS ADMIN
export const actionButtonsGetLinks = Markup.inlineKeyboard(
    [linkGitHub, linkTg, linkCodeWars, linkFreeCodeCamp, linkItIncubator, linkUniversity, linkVk, linksButtonBeck],
    {
        columns: 3,
    },
);

//MAIN USER
export const actionButtonsUsersMain: any = Markup.inlineKeyboard([getMainButtonResumeInfoUsers], {
    columns: 1,
});

//GET RESUME USER
export const actionButtonsGetResumeUsers = Markup.inlineKeyboard(
    [
        getButtonResumeAboutMe,
        getButtonResumeContact,
        getButtonResumeLines,
        getButtonResumeTechnologies,
        getButtonResumeExperience,
        getButtonResumeEducation,
        getButtonResumePhoto,
        userButtonBackGetResume,
    ],
    {
        columns: 3,
    },
);
