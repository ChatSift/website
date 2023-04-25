import { RouterLink } from '~/components/Link';
import { Text } from '~/components/Text';
import { styled, theme } from '~/stitches/stitches.config';

export const Card = styled(RouterLink, {
	displayFlex: 'column',
	borderRadius: theme.radii.lg,
	padding: theme.space.lg,
	width: '100%',
	height: '100%',
	gap: theme.space.md,
	backgroundColor: theme.colors.bgCard,
	borderThin: theme.colors.onBgSecondary,

	variants: {
		cardWidth: {
			fixed: {
				width: '293px',
			},
			full: {
				width: '100%',
			},
		},
	},
});

export const Header = styled('div', {
	displayFlex: 'row',
	justifyContent: 'space-between',
	gap: theme.space.md,
});

export const BotTag = styled(Text, {
	displayFlex: 'row',
	alignItems: 'center',
	gap: theme.space.xs,
});
