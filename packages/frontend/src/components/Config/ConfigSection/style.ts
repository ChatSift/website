import { styled, theme } from '~/stitches/stitches.config';

export const ConfigSection = styled('section', {
	displayFlex: 'column',
	gap: theme.space.lg,
	padding: theme.space.lg,
	borderRadius: theme.radii.lg,
	backgroundColor: theme.colors.bgCard,
	borderThin: theme.colors.onBgSecondary,
});

export const SectionHeader = styled('div', {
	displayFlex: 'column',
});
