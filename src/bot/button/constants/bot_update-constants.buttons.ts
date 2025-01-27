import { Markup } from 'telegraf';
import { DataBatton, NameBatton } from '../../common/enum/bot_actions.enum';

export const adminButtonUpdateAboutMe = Markup.button.callback(NameBatton.AboutMe, DataBatton.AboutMe);

export const adminButtonUpdateContact = Markup.button.callback(NameBatton.Contacts, DataBatton.Contacts);

export const adminButtonUpdateLines = Markup.button.callback(NameBatton.Lines, DataBatton.Lines);

export const adminButtonUpdateTechnologies = Markup.button.callback(NameBatton.Technologies, DataBatton.Technologies);

export const adminButtonUpdateExperience = Markup.button.callback(NameBatton.Experience, DataBatton.Experience);

export const adminButtonUpdateEducation = Markup.button.callback(NameBatton.Education, DataBatton.Education);

export const adminButtonUpdatePhoto = Markup.button.callback(NameBatton.Photo, DataBatton.Photo);
