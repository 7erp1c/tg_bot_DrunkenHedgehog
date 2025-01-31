//GET BUTTON
import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/types';
import { DataBatton, NameBatton } from '../../common/enum/bot_actions.enum';

export const getMainButtonResumeInfo = Markup.button.callback(NameBatton.GetResumeInfo, DataBatton.GetResumeInfo);

//GET BUTTONS
export const getButtonResumeAboutMe = Markup.button.callback(NameBatton.GetAboutMe, DataBatton.GetAboutMe);

export const getButtonResumeContact = Markup.button.callback(NameBatton.GetContacts, DataBatton.GetContacts);

export const getButtonResumeLines = Markup.button.callback(NameBatton.GetLines, DataBatton.GetLines);

export const getButtonResumeTechnologies = Markup.button.callback(
    NameBatton.GetTechnologies,
    DataBatton.GetTechnologies,
);

export const getButtonResumeExperience = Markup.button.callback(NameBatton.GetExperience, DataBatton.GetExperience);

export const getButtonResumeEducation = Markup.button.callback(NameBatton.GetEducation, DataBatton.GetEducation);

export const getButtonResumePhoto = Markup.button.callback(NameBatton.GetPhoto, DataBatton.GetPhoto);

//USERS
export const getMainButtonResumeInfoUsers = Markup.button.callback(
    NameBatton.GetResumeInfo,
    DataBatton.GetResumeForUsers,
);
export const getMainButtonResumeNoFeedBeck = Markup.button.callback('Оставить ОС', 'leave_the_os');
export const getMainButtonResumeExistFeedBeck = Markup.button.callback('Редактировать ОС', 'edit_the_os');
