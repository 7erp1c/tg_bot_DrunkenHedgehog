import { Markup } from 'telegraf';
import { DataButton, NameButton } from '../../common/enum/bot_actions.enum';

export const adminButtonUpdateAboutMe = Markup.button.callback(NameButton.AboutMe, DataButton.AboutMe);

export const adminButtonUpdateContact = Markup.button.callback(NameButton.Contacts, DataButton.Contacts);

export const adminButtonUpdateLines = Markup.button.callback(NameButton.Lines, DataButton.Lines);

export const adminButtonUpdateTechnologies = Markup.button.callback(NameButton.Technologies, DataButton.Technologies);

export const adminButtonUpdateExperience = Markup.button.callback(NameButton.Experience, DataButton.Experience);

export const adminButtonUpdateEducation = Markup.button.callback(NameButton.Education, DataButton.Education);

export const adminButtonUpdatePhoto = Markup.button.callback(NameButton.Photo, DataButton.Photo);
