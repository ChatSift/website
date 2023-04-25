import { Text } from '~/components/Text';
import { styled, theme } from '~/stitches/stitches.config';

export const Card = styled('article', {
	display: 'flex',
	borderRadius: theme.radii.lg,
	backgroundColor: theme.colors.bgCard,
	borderThin: theme.colors.onBgSecondary,

	// hack to make the skeleton not take up too much height
	'> span': {
		display: 'flex',
	},

	variants: {
		padding: {
			small: {
				padding: theme.space.sm,
			},
			large: {
				padding: theme.space.lg,
			},
		},

		wide: {
			true: {
				flexDirection: 'row',
				alignItems: 'center',
				gap: theme.space.lg,
			},
			false: {
				flexDirection: 'column',
				gap: theme.space.sm,
			},
		},
	},
});

export const GuildImage = styled('img', {
	display: 'flex !important',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '100% !important',
	borderThin: theme.colors.onBgSecondary,

	variants: {
		large: {
			true: {
				width: `${theme.sizes.largeImage} !important`,
				height: `${theme.sizes.largeImage} !important`,
			},
			false: {
				width: `${theme.sizes.image} !important`,
				height: `${theme.sizes.image} !important`,
			},
		},
	},
});

export const GuildAcronym = styled(GuildImage, {
	'&::after': {
		color: theme.colors.textPrimary,
		maxWidth: '70%',
		content: 'attr(data-full)',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
});

export const CardHeader = styled('div', {
	displayFlex: 'column',
	gap: theme.space.xxs,
	flex: '1 1 auto',
});

export const GuildName = styled(Text, {
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
});
