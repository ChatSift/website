import { Text } from '~/components/Text';
import { styled, theme } from '~/stitches/stitches.config';

export const Upsell = styled('div', {
	backgroundColor: theme.colors.bgCard,
	borderThin: theme.colors.onBgTertiary,
	borderRadius: theme.radii.lg,
	padding: theme.space.lg,
	display: 'flex',
	gap: theme.space.lg,
	justifyContent: 'space-between',

	variants: {
		direction: {
			column: {
				flexDirection: 'column',
			},
			row: {
				flexDirection: 'row',
			},
		},
	},
});

export const Main = styled('div', {
	displayFlex: 'column',
	gap: theme.space.md,
});

export const Buttons = styled('div', {
	display: 'flex',
	gap: theme.space.md,

	variants: {
		direction: {
			column: {
				flexDirection: 'column',
				alignItems: 'flex-start',
			},
			row: {
				flexDirection: 'row',
				alignItems: 'center',
			},
		},
	},
});

export const Title = styled(Text, {
	displayFlex: 'row',
	gap: theme.space.xs,
});
