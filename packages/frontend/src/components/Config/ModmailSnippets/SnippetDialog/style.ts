import { Text } from '~/components/Text';
import { styled, theme } from '~/stitches/stitches.config';

export const InputLabel = styled(Text, {
	marginBottom: theme.space.sm,

	'&:not(:first-of-type)': {
		marginTop: theme.space.lg,
	},
});

export const DialogDescription = styled('div', {
	displayFlex: 'column',
	padding: theme.space.lg,
	backgroundColor: theme.colors.bgCard,
});

export const CharacterLimit = styled(Text, {
	marginTop: theme.space.xxs,
	transition: 'scale 0.2s ease-in-out, color 0.2s ease-in-out',
	transformOrigin: 'left center',

	variants: {
		isLimitExceeded: {
			true: {
				color: theme.colors.miscDanger,
				scale: 1.1,
			},
			false: {
				scale: 1,
			},
		},
	},
});
