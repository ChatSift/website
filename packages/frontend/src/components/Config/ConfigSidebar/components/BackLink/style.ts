import { RouterLink } from '~/components/Link';
import { styled, theme } from '~/stitches/stitches.config';

export const BackLink = styled('span', {
	color: theme.colors.textPrimary,
	borderBottomWidth: theme.borderWidths.thin,
	borderBottomStyle: theme.borderStyles.normal,
	borderBottomColor: 'transparent',
	width: 'fit-content',
	fontSize: theme.fontSizes.three,
	fontWeight: theme.fontWeights.bold,

	'&:hover': {
		borderBottomColor: theme.colors.textPrimary,
	},
});

export const Anchor = styled(RouterLink, {
	display: 'flex',
	gap: theme.space.sm,
	alignItems: 'center',
});
