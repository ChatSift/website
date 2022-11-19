import styled from '@emotion/styled';
import { desktopThreshold } from '~/components/Sidebar/style';

export const NavMenu = styled.nav`
	${desktopThreshold} {
		display: flex;
	}

	display: none;
	flex-direction: column;
	width: 300px;
	height: 100%;
	border-right: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
	padding: 24px;
`;
