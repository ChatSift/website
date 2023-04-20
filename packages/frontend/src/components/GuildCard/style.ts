import { Text } from '~/components/Text';
import { styled, theme } from '~/stitches/stitches.config';
import { guildCardGap, guildCardWidthDesktop, guildCardWidthMobile } from '~/utils/constants';

const guildCardInnerGap = theme.space.md;
export const guildCardSmallDashWidth = '80vw';

export const GuildTitle = styled(Text, {
	whiteSpace: 'nowrap',
	width: '100%',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
});

export const CardHeader = styled('div', {
	displayFlex: 'row',
	alignItems: 'center',
	gap: theme.space.md,
});

export const NotInvitedHover = styled('div', {
	displayFlex: 'column',
	gap: guildCardInnerGap,
});

export const BotListNotInvited = styled('ul', {
	displayFlex: 'row',
	gap: theme.space.md,
});

export const Bot = styled('a', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.colors.onBgTertiary,
	borderRadius: theme.radii.sm,
	width: theme.sizes.image,
	height: theme.sizes.image,
});

export const GuildImage = styled('img', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.colors.onBgTertiary,
	width: `${theme.sizes.image} !important`,
	height: theme.sizes.image,
	borderRadius: `${theme.radii.rounded} !important`,
	borderThin: theme.colors.onBgSecondary,
});

export const GuildAcronym = styled(GuildImage, {
	'&::after': {
		maxWidth: '70%',
		content: 'attr(data-full)',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
});

export const GuildCardBase = styled('a', {
	displayFlex: 'column',
	gap: guildCardInnerGap,
	padding: guildCardGap,
	borderRadius: theme.radii.lg,
	borderThin: theme.colors.onBgSecondary,
	minWidth: guildCardWidthMobile,
	height: 144,

	[`&:not(:hover) ${NotInvitedHover}`]: {
		display: 'none',
	},

	variants: {
		mobile: {
			true: {
				width: guildCardSmallDashWidth,
			},
			false: {
				width: guildCardWidthDesktop,
			},
		},

		isInvited: {
			true: {
				backgroundColor: theme.colors.bgCard,

				'#header-title': {
					display: 'none',
				},
			},
		},

		isSkeleton: {
			true: {
				[`${NotInvitedHover}`]: {
					display: 'none',
				},
			},
		},
	},

	compoundVariants: [
		{
			isInvited: false,
			isSkeleton: false,
			css: {
				'&:not(:hover) #header-title': {
					display: 'none',
				},

				'&:hover': {
					'#not-invited-hover-title': {
						display: 'none',
					},

					[`${GuildAcronym}, ${GuildImage}`]: {
						width: theme.sizes.smallImage,
						height: theme.sizes.smallImage,
						aspectRatio: '1',
					},

					[`${GuildAcronym}::after`]: {
						content: 'attr(data-first-letter)',
					},

					'.not-invited': {
						display: 'none',
					},
				},
			},
		},
		{
			isInvited: true,
			isSkeleton: false,
			css: {
				cursor: 'pointer',
			},
		},
	],
});

export const NameAndBots = styled('div', {
	displayFlex: 'column',
	gap: theme.space.xxs,
});

export const BotList = styled('ul', {
	displayFlex: 'row',
	gap: theme.space.xxs,
});
