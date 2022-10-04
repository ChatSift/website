import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import autoModerator from './automoderator';
import ama from '~/data/bots/ama';
import SvgAma from '~/svg/SvgAma';
import SvgAutoModerator from '~/svg/SvgAutoModerator';

// key = the path name of the bot
// => /bot/[key]
const bots: Record<string, Bot> = {
	automoderator: autoModerator,
	ama,
} as const;

export const botIcons: Record<keyof typeof bots, (props: { width?: number; height: number }) => EmotionJSX.Element> = {
	automoderator: SvgAutoModerator,
	ama: SvgAma,
};

export default bots;
