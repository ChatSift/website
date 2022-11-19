import { css } from '@emotion/css';
import styled from '@emotion/styled';
import * as Avatar from '@radix-ui/react-avatar';
import type { ThemeProps } from '~/themes/theme';

export const AvatarImage = styled(Avatar.Image)`
	border: 1px solid ${(props: ThemeProps) => props.theme.colors.onBackground.secondary};
`;

export const AvatarStyleDesktop = css`
	width: 48px;
	height: 48px;
	border-radius: 100%;
`;

export const TextOverflowEllipsis = styled.div`
	flex: 1 1 auto;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: ${(props: ThemeProps) => props.theme.colors.text.primary};
`;

export const AvatarStyleMobile = css`
	width: 32px;
	height: 32px;
	border-radius: 100%;
	flex-shrink: 0;
`;

export const MobileUser = styled.div`
	display: flex;
	align-items: center;
	flex: 1 1 auto;
	min-width: 0;
`;

export const Username = styled.span`
	font-size: 18px;
	color: ${(props) => props.theme.colors.text.primary};
	margin-left: 12px;
`;

export const Discriminator = styled.span`
	font-size: 18px;
	color: ${(props) => props.theme.colors.text.disabled};
`;
