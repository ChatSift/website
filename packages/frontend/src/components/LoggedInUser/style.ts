import { css } from '@emotion/css';
import styled from '@emotion/styled';
import * as Avatar from '@radix-ui/react-avatar';
import type { ThemeProps } from '../../themes/theme';

export const AvatarImage = styled(Avatar.Image)`
	border: 1px solid ${(props: ThemeProps) => props.theme.colors.onBackground.secondary};
`;

export const AvatarStyle = css`
	width: 48px;
	height: 48px;
	border-radius: 100%;
`;
