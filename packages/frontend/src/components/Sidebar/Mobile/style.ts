import styled from '@emotion/styled';
import { animated } from 'react-spring';
import { desktopThreshold } from '~/components/Sidebar/style';
import type { ThemeProps } from '~/themes/theme';

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

export const MainContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 24px;
`;

export const MobileUser = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;
	justify-content: space-between;
	background-color: ${(props: ThemeProps) => props.theme.colors.background.default};
	width: 100%;
	z-index: -1;
	border-top: 1px solid ${(props: ThemeProps) => props.theme.colors.onBackground.secondary};
	padding: 14px;
`;

export const Menu = styled(SidebarAnimatedDiv)`
	touch-action: none;
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	z-index: 16000;
	background-color: ${(props) => props.theme.colors.background.default};
	border-right: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
	box-sizing: border-box;
	width: 300px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	max-width: 80vw;
`;
