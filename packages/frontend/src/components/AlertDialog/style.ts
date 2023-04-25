import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { styled, theme } from '~/stitches/stitches.config';
import { dialogOverlayColor } from '~/utils/constants';

export const Overlay = styled(AlertDialog.Overlay, {
	position: 'fixed',
	top: 0,
	inset: 0,
	backgroundColor: dialogOverlayColor,
	zIndex: 11_000,
});

export const Content = styled(AlertDialog.Content, {
	backgroundColor: theme.colors.bgBase,
	borderThin: theme.colors.onBgSecondary,
	borderRadius: theme.radii.sm,
	position: 'fixed',
	top: '50%',
	left: '50%',
	translate: '-50% -50%',
	width: '90vw',
	maxWidth: 500,
	zIndex: 100_000,

	variants: {
		isLoading: {
			true: {
				'&::after': {
					content: '',
					position: 'fixed',
					inset: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.3)',
					cursor: 'not-allowed',
				},
			},
		},
	},
});

export const Title = styled(AlertDialog.Title, {
	color: theme.colors.textPrimary,
	fontSize: theme.fontSizes.four,
	paddingX: theme.space.lg,
	paddingY: theme.space.md,
	borderBottomThin: theme.colors.onBgSecondary,
});

export const Description = styled(AlertDialog.Description, {
	backgroundColor: theme.colors.bgCard,
	color: theme.colors.textPrimary,
	paddingY: theme.space.xl,
	paddingX: theme.space.lg,
});

export const Buttons = styled('div', {
	displayFlex: 'row',
	justifyContent: 'flex-end',
	gap: theme.space.lg,
	paddingX: theme.space.lg,
	paddingY: theme.space.md,
	borderTopThin: theme.colors.onBgSecondary,
});
