import * as Switch from '@radix-ui/react-switch';
import { styled, theme } from '~/stitches/stitches.config';

export const Root = styled(Switch.Root, {
	width: 40,
	height: 24,
	backgroundColor: theme.colors.onBgPrimary,
	borderRadius: theme.radii.full,
	position: 'relative',
	cursor: 'pointer',

	'&[data-state="checked"]': {
		backgroundColor: theme.colors.miscAccent,
	},

	'&[disabled]': {
		cursor: 'not-allowed',
		opacity: 0.5,
	},
});

export const Thumb = styled(Switch.Thumb, {
	position: 'absolute',
	top: 0,
	display: 'block',
	width: 24,
	height: 24,
	backgroundColor: theme.colors.textOnAccent,
	backgroundClip: 'padding-box',
	borderWidth: 4,
	borderStyle: theme.borderStyles.normal,
	borderColor: 'transparent',
	borderRadius: '100%',

	'&[data-state="checked"]': {
		right: 0,
	},
});
