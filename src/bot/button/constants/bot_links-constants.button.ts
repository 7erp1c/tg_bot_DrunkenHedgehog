import { Markup } from 'telegraf';
import { LinksEnum, NameLinksEnum } from '../../common/enum/bot_actions-links.enum';

export const linkGitHub = Markup.button.url(NameLinksEnum.GitHub, LinksEnum.GitHub);

export const linkTg = Markup.button.url(NameLinksEnum.Tg, LinksEnum.Tg);

export const linkCodeWars = Markup.button.url(NameLinksEnum.CodeWars, LinksEnum.CodeWars);

export const linkFreeCodeCamp = Markup.button.url(NameLinksEnum.FreeCodeCamp, LinksEnum.FreeCodeCamp);

export const linkItIncubator = Markup.button.url(NameLinksEnum.ItIncubator, LinksEnum.ItIncubator);

export const linkUniversity = Markup.button.url(NameLinksEnum.University, LinksEnum.University);

export const linkVk = Markup.button.url(NameLinksEnum.Vk, LinksEnum.Vk);

export const linksButtonBeck = Markup.button.callback(NameLinksEnum.resumeBeck, LinksEnum.resumeBeck);
