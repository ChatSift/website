import { styled, theme } from '~/stitches/stitches.config';

export const ErrorBoundary = styled('div', {
	displayFlex: 'column',
	flex: '1 1 auto',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.space.lg,
});

export const Title = styled('h1', {
	color: theme.colors.textPrimary,
	fontSize: theme.fontSizes.five,
});

export const Buttons = styled('div', {
	displayFlex: 'row',
	gap: theme.space.lg,
	alignItems: 'center',
});
