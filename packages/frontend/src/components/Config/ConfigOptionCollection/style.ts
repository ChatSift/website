import { styled, theme } from '~/stitches/stitches.config';

export const ConfigOptionCollection = styled('ul', {
	displayFlex: 'column',
	borderRadius: theme.radii.lg,
	backgroundColor: theme.colors.onBgTertiary,
	borderThin: theme.colors.onBgSecondary,

	'> *:not(:last-child)': {
		borderBottomThin: theme.colors.onBgSecondary,
	},
});
