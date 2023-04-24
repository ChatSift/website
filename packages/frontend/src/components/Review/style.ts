import { styled, theme } from '~/stitches/stitches.config';

export const Base = styled('figure', {
	displayFlex: 'column',
	justifyContent: 'space-between',
	padding: theme.space.lg,
	borderRadius: theme.radii.lg,
	backgroundColor: theme.colors.bgCard,
	borderThin: theme.colors.onBgSecondary,

	variants: {
		height: {
			small: {
				height: 152,
			},
			medium: {
				height: 164,
			},
			large: {
				height: 200,
			},
		},
	},
});

export const Author = styled('figcaption', {
	displayFlex: 'row',
	gap: theme.space.sm,
	alignItems: 'center',
});

export const AuthorAvatar = styled('img', {
	width: theme.sizes.mediumImage,
	height: theme.sizes.mediumImage,
	borderRadius: theme.radii.rounded,
});
