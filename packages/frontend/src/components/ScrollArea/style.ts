import * as ScrollAreaBase from '@radix-ui/react-scroll-area';
import { styled, theme } from '~/stitches/stitches.config';

export const Root = ScrollAreaBase.Root;
export const ViewPort = ScrollAreaBase.Viewport;

export const Thumb = styled(ScrollAreaBase.Thumb, {
	backgroundColor: theme.colors.onBgSecondary,
	borderRadius: theme.radii.lg,
	transition: 'background-color 0.2s ease-in-out',
});

export const Scrollbar = styled(ScrollAreaBase.Scrollbar, {
	backgroundColor: theme.colors.bgCard,
	width: 24,
	backgroundClip: 'padding-box',
	zIndex: 90_000,
	borderWidth: 8,
	borderStyle: theme.borderStyles.normal,
	borderColor: 'transparent',

	[`&:hover ${Thumb}`]: {
		backgroundColor: theme.colors.onBgPrimary,
	},
});
