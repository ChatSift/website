import * as Select from '@radix-ui/react-select';
import { Text } from '~/components/Text';
import { styled, theme, css } from '~/stitches/stitches.config';

const iconAndValueGap = theme.space.sm;

export const Container = styled('div', {
	displayFlex: 'column',
	gap: theme.space.xxs,

	variants: {
		isDisabled: {
			true: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
	},
});

export const DropdownMenuContainer = styled('div', {
	displayFlex: 'column',
	position: 'relative',
});

export const Content = styled(Select.Content, {
	padding: theme.space.sm,
	width: '100%',
	borderThin: theme.colors.onBgSecondary,
	borderRadius: theme.radii.sm,
	backgroundColor: theme.colors.bgCard,
	zIndex: 11_000,
});

export const Viewport = styled(Select.Viewport, {
	displayFlex: 'column',
	gap: theme.space.xxs,
});

export const Group = styled(Select.Group, {
	'&:not(:first-of-type)': {
		marginTop: theme.space.lg,
	},
});

export const GroupLabel = styled(Select.Label, {
	color: theme.colors.textSecondary,
	fontSize: theme.fontSizes.zero,
	borderBottomThin: theme.colors.textSecondary,
	marginBottom: theme.space.sm,
	paddingX: theme.space.sm,
	paddingY: theme.space.xxs,
});

export const Item = styled(Select.Item, {
	padding: theme.space.sm,
	color: theme.colors.textPrimary,
	borderRadius: theme.radii.sm,
	cursor: 'pointer',
	outline: 'none',
	fontSize: theme.fontSizes.two,
	displayFlex: 'row',
	alignItems: 'center',
	gap: iconAndValueGap,

	'&[data-state="checked"]': {
		backgroundColor: theme.colors.miscAccent,
		color: theme.colors.textOnAccent,
		fontWeight: theme.fontWeights.thin,
	},

	'&[data-highlighted]:not([data-state="checked"])': {
		backgroundColor: theme.colors.onBgSecondary,
	},
});

export const itemIcon = css({
	width: theme.sizes.dropdownIcon,
	height: theme.sizes.dropdownIcon,
});

export const DropdownArrowIcon = styled(Select.Icon, {
	display: 'flex',
	alignItems: 'center',
});

export const ValueAndIcon = styled(Text, {
	displayFlex: 'row',
	alignItems: 'center',
	gap: iconAndValueGap,
});

export const Trigger = styled(Select.Trigger, {
	backgroundColor: theme.colors.onBgTertiary,
	borderThin: theme.colors.onBgSecondary,
	borderRadius: theme.radii.sm,
	padding: theme.space.md,
	gap: theme.space.md,
	displayFlex: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	cursor: 'pointer',

	[`&[data-placeholder] ${ValueAndIcon}`]: {
		fontWeight: theme.fontWeights.thin,
		color: theme.colors.textSecondary,
	},
});
