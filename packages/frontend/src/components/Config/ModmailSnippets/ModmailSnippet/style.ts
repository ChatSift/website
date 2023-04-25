import { styled, theme } from '~/stitches/stitches.config';

export const Snippet = styled('article', {
	displayFlex: 'column',
	backgroundColor: theme.colors.bgCard,
	borderThin: theme.colors.onBgSecondary,
	borderRadius: theme.radii.sm,
});

export const SnippetHeader = styled('div', {
	displayFlex: 'row',
	backgroundColor: theme.colors.onBgTertiary,
	borderBottomThin: theme.colors.onBgSecondary,
	padding: theme.space.md,
	color: theme.colors.textPrimary,
	fontWeight: theme.fontWeights.medium,
	fontSize: theme.fontSizes.three,
});

export const SnippetBody = styled('div', {
	color: theme.colors.textSecondary,
	paddingX: theme.space.sm,
	paddingY: theme.space.xl,
	fontSize: theme.fontSizes.one,
});

export const Buttons = styled('div', {
	displayFlex: 'row',
	gap: theme.space.sm,
	backgroundColor: theme.colors.onBgTertiary,
	borderTopThin: theme.colors.onBgSecondary,
	padding: theme.space.sm,
});
