import { styled, theme } from '~/stitches/stitches.config';

export const noJsControlsGap = '8px';
export const noJsControlSize = '16px';

export const Base = styled('div', {
	displayFlex: 'column',
	gap: theme.space.lg,
});

export const Content = styled('div', {
	display: 'grid',
	flexDirection: 'row',
	minWidth: '100%',
});

export const ControlsArrows = styled('div', {
	displayFlex: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: theme.space.xs,
});

export const ControlsNoJs = styled('div', {
	display: 'none',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'relative',
	marginBottom: theme.space.xxl,
});

export const NoJsPageRadioButton = styled('input', {
	position: 'absolute',
	bottom: `calc(${theme.space.xxl} * -1)`,
	width: noJsControlSize,
	height: noJsControlSize,
	appearance: 'none',
	backgroundColor: theme.colors.textDisabled,
	borderRadius: '100%',
	scale: 0.9,
	opacity: 0.7,
	transition: 'background-color 0.2s ease-in-out, scale 0.2s ease-in-out',
	cursor: 'pointer',

	'&:hover': {
		scale: 1,
		backgroundColor: theme.colors.textSecondary,
	},

	'&:checked': {
		scale: 1.1,
		backgroundColor: theme.colors.textPrimary,
	},
});
