import type { ReactElement } from 'react';
import ama from '~/data/bots/ama';
import autoModerator from '~/data/bots/automoderator';
import modmail from '~/data/bots/modmail';
import SvgAma from '~/svg/SvgAma';
import SvgAutoModerator from '~/svg/SvgAutoModerator';
import SvgModmail from '~/svg/SvgModmail';

// key = the path name of the bot
// => /bot/[key]
const bots: Record<BotId, Bot> = {
	automoderator: autoModerator,
	ama,
	modmail,
} as const;

export const botIcons: Record<BotId, (props: { height: number; width?: number }) => ReactElement> = {
	automoderator: SvgAutoModerator,
	ama: SvgAma,
	modmail: SvgModmail,
};

export default bots;
