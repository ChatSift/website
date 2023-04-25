import { RouterLink } from '~/components/Link';
import { styled, theme } from '~/stitches/stitches.config';

export const buttonPadding = 6;

export const CopyrightNotice = styled('span', {
	whiteSpace: 'nowrap',
});

export const Footer = styled('footer', {
	displayFlex: 'column',
	justifyContent: 'space-between',
	gap: theme.space.lg,
	borderTopWidth: theme.borderWidths.thin,
	borderTopStyle: theme.borderStyles.normal,
	borderTopColor: theme.colors.onBgSecondary,
	color: theme.colors.textSecondary,
	fontWeight: theme.fontWeights.thin,

	variants: {
		hasMargin: {
			true: {
				marginTop: theme.space.xxl,
			},
		},

		mobile: {
			true: {
				flexDirection: 'row',
				alignItems: 'center',
				paddingX: theme.space.xl,
				paddingY: theme.space.lg,
			},
			false: {
				padding: theme.space.lg,
			},
		},
	},
});

export const List = styled('div', {
	displayFlex: 'row',
	alignItems: 'center',
	gap: theme.space.lg,
});

export const ButtonsAndLinks = styled(List, {
	justifyContent: 'space-between',
	width: '100%',
});

export const SecondGroup = styled('div', {
	displayFlex: 'row',
	gap: theme.space.sm,
	alignItems: 'center',
});

export const IconLink = styled(RouterLink, {
	display: 'flex',
});
