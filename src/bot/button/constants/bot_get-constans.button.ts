import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/types';
import { DataButton, NameButton } from '../../common/enum/bot_actions.enum';

export const getMainButtonResumeInfo = Markup.button.callback(NameButton.GetResumeInfo, DataButton.GetResumeInfo);

//GET BUTTONS
export const getButtonResumeAboutMe = Markup.button.callback(NameButton.GetAboutMe, DataButton.GetAboutMe);

export const getButtonResumeContact = Markup.button.callback(NameButton.GetContacts, DataButton.GetContacts);

export const getButtonResumeLines = Markup.button.callback(NameButton.GetLines, DataButton.GetLines);

export const getButtonResumeTechnologies = Markup.button.callback(
    NameButton.GetTechnologies,
    DataButton.GetTechnologies,
);

export const getButtonResumeExperience = Markup.button.callback(NameButton.GetExperience, DataButton.GetExperience);

export const getButtonResumeEducation = Markup.button.callback(NameButton.GetEducation, DataButton.GetEducation);

export const getButtonResumePhoto = Markup.button.callback(NameButton.GetPhoto, DataButton.GetPhoto);

//USERS
export const getMainButtonResumeInfoUsers = Markup.button.callback(
    NameButton.GetResumeInfo,
    DataButton.GetResumeForUsers,
);
export const getMainButtonResumeNoFeedBeck = Markup.button.callback(NameButton.CreateFeedback, DataButton.FeedBack);
export const getMainButtonResumeExistFeedBeck = Markup.button.callback(NameButton.EditFeedback, DataButton.FeedBack);
