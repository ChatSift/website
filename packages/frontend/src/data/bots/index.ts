import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import autoModerator from './automoderator';
import SvgAutoModerator from '~/svg/SvgAutoModerator';

// key = the path name of the bot
// => /bot/[key]
const bots: Record<string, Bot> = {
	automoderator: autoModerator,
} as const;

export const botIcons: Record<keyof typeof bots, (props: { width?: number; height: number }) => EmotionJSX.Element> = {
	automoderator: SvgAutoModerator,
};

export default bots;
