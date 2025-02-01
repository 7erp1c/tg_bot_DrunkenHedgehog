import { Markup } from 'telegraf';
import { BotActions, DataButton, NameButton } from '../common/enum/bot_actions.enum';
import {
    getButtonResumeAboutMe,
    getButtonResumeContact,
    getButtonResumeEducation,
    getButtonResumeExperience,
    getButtonResumeLines,
    getButtonResumePhoto,
    getButtonResumeTechnologies,
    getMainButtonResumeExistFeedBeck,
    getMainButtonResumeInfo,
    getMainButtonResumeInfoUsers,
    getMainButtonResumeNoFeedBeck,
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

//MAIN MENU
const adminButtonAllUsers = Markup.button.callback(BotActions.ALL_USERS, BotActions.ALL_USERS);

const adminButtonCreateResume = Markup.button.callback(NameButton.UpdateResume, DataButton.UpdateResume);

const adminButtonBack = Markup.button.callback(NameButton.BackToMain, DataButton.BackToMain); //кнопка назад в основное меню

const userButtonBackGetResume = Markup.button.callback(NameButton.BackToMain, DataButton.BackToMainMenuUsers); //кнопка назад в основное меню users<=get resume

//ADMIN MAIN MENU
export const actionButtonsAdminMain: any = Markup.inlineKeyboard(
    [adminButtonAllUsers, adminButtonCreateResume, getMainButtonResumeInfo],
    {
        columns: 2,
    },
);

//ADMIN UPDATE RESUME
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

//ADMIN GET RESUME
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

//ADMIN GET LINKS
export const actionButtonsGetLinks = Markup.inlineKeyboard(
    [linkGitHub, linkTg, linkCodeWars, linkFreeCodeCamp, linkItIncubator, linkUniversity, linkVk, linksButtonBeck],
    {
        columns: 3,
    },
);

//MAIN USERS NO OS
export const actionButtonsUsersMainNoFB: any = Markup.inlineKeyboard(
    [getMainButtonResumeInfoUsers, getMainButtonResumeNoFeedBeck],
    {
        columns: 1,
    },
);

//MAIN USERS EXIST OS
export const actionButtonsUsersMainExistFB: any = Markup.inlineKeyboard(
    [getMainButtonResumeInfoUsers, getMainButtonResumeExistFeedBeck],
    {
        columns: 1,
    },
);

//GET RESUME USERS
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
