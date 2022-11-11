import styled from '@emotion/styled';
import { animated } from 'react-spring';
import { desktopThreshold } from '~/components/Sidebar/style';

const SidebarAnimatedDiv = styled(animated.div)`
	${desktopThreshold} {
		display: none !important;
	}
`;

export const Backdrop = styled(SidebarAnimatedDiv)`
	z-index: 15000;
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000;
`;

export const Menu = styled(SidebarAnimatedDiv)`
	touch-action: none;
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	z-index: 16000;
	background-color: ${(props) => props.theme.colors.background.default};
	box-sizing: border-box;
	width: 300px;
	display: flex;
	flex-direction: column;
	max-width: 80vw;
`;
