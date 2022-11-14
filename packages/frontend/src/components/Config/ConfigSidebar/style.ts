import styled from '@emotion/styled';
import { RouterLink } from '~/components/Link';
import Sidebar from '~/components/Sidebar';
import * as Text from '~/components/Text';

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
`;

export const LinkTextActive = styled(Text.Body.Bold)`
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const LinkText = styled(Text.Body.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;
