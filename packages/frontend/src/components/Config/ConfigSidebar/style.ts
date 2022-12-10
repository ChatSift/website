import styled from '@emotion/styled';
import { RouterLink } from '~/components/Link';
import Sidebar from '~/components/Sidebar';

export const ConfigSidebar = styled(Sidebar)`
	gap: 16px;
`;

export const Links = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SidebarLink = styled(RouterLink)`
	padding: 8px 12px;
	border-radius: 4px;

	&[data-active='true'] {
		background-color: ${({ theme }) => theme.colors.onBackground.tertiary};
	}

	&[data-loading='true'] {
		pointer-events: none;
	}
`;
