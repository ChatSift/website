import * as Avatar from '@radix-ui/react-avatar';
import { styled, css, theme } from '~/stitches/stitches.config';

export const AvatarImage = styled(Avatar.Image, {
	borderThin: theme.colors.onBgSecondary,
});

export const AvatarStyleDesktop = css({
	width: theme.sizes.image,
	height: theme.sizes.image,
	borderRadius: theme.radii.rounded,
});

export const TextOverflowEllipsis = styled('div', {
	flex: '1 1 auto',
	minWidth: 0,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	color: theme.colors.textPrimary,
	marginLeft: theme.space.md,
});

export const AvatarStyleMobile = css({
	width: theme.sizes.mediumImage,
	height: theme.sizes.mediumImage,
	borderRadius: theme.radii.rounded,
	flexShrink: 0,
});

export const MobileUser = styled('div', {
	display: 'flex',
	alignItems: 'center',
	flex: '1 1 auto',
	minWidth: 0,
});
