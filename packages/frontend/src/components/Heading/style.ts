import { styled, theme } from '~/stitches/stitches.config';

export const Heading = styled('div', {
	displayFlex: 'column',
	gap: theme.space.md,
});

export const Title = styled('p', {
	fontSize: theme.fontSizes.four,
	fontWeight: theme.fontWeights.bold,
	color: theme.colors.textPrimary,
});

export const Subtitle = styled('p', {
	fontSize: theme.fontSizes.two,
	fontWeight: theme.fontWeights.thin,
	color: theme.colors.textSecondary,
});
