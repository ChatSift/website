import { styled, theme, css } from '~/stitches/stitches.config';

export const Frame = styled('div', {
	displayFlex: 'row',
	flex: '1 1 auto',
	minHeight: 0,
});

export const NoScript = styled('noscript', {
	displayFlex: 'column',
	flex: '1 1 auto',
	alignItems: 'center',
	justifyContent: 'center',
});

export const Container = styled('div', {
	flex: '1 1 auto',
	maxWidth: '100vw',
	position: 'relative',

	variants: {
		padding: {
			small: {
				padding: theme.space.lg,
			},
			large: {
				padding: theme.space.xl,
			},
		},
	},
});

export const Content = css({
	displayFlex: 'column',
	height: '100%',
	overflowY: 'auto',
});

export const ContentContainer = styled('div', {
	paddingBottom: 64,
	displayFlex: 'column',
	gap: theme.space.xl,
});

export const DirtyBarSlot = styled('div', {
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
});
