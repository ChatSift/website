import { Text } from '~/components/Text';
import { styled, theme } from '~/stitches/stitches.config';

export const BotCard = styled('div', {
	displayFlex: 'column',
	gap: theme.space.md,
	backgroundColor: theme.colors.bgCard,
	padding: theme.space.lg,
	borderRadius: theme.radii.lg,
});

export const Title = styled(Text, {
	displayFlex: 'row',
	gap: theme.space.xs,
});

export const Buttons = styled('div', {
	displayFlex: 'row',
	gap: theme.space.md,
	marginTop: 'auto',

	'& > *': {
		flex: '1',
	},
});
