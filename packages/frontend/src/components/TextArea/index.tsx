import { styled, theme } from '~/stitches/stitches.config';

export const TextArea = styled('textarea', {
	borderThin: theme.colors.onBgSecondary,
	backgroundColor: theme.colors.onBgTertiary,
	color: theme.colors.textPrimary,
	borderRadius: theme.radii.sm,
	padding: theme.space.sm,
	resize: 'vertical',
});
