import { RouterLink } from '~/components/Link';
import Sidebar from '~/components/Sidebar';
import { styled, theme } from '~/stitches/stitches.config';

export const ConfigSidebar = styled(Sidebar, {
	gap: theme.space.lg,
});

export const Links = styled('div', {
	displayFlex: 'column',
});

export const SidebarLink = styled(RouterLink, {
	padding: `${theme.space.sm} ${theme.space.md}`,
	borderRadius: theme.radii.sm,

	variants: {
		isActive: {
			true: {
				backgroundColor: theme.colors.onBgTertiary,
			},
		},
		isLoading: {
			true: {
				pointerEvents: 'none',
			},
		},
	},
});
