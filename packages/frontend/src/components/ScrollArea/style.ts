import styled from '@emotion/styled';
import * as ScrollAreaBase from '@radix-ui/react-scroll-area';

export const Root = ScrollAreaBase.Root;
export const ViewPort = ScrollAreaBase.Viewport;

export const Thumb = styled(ScrollAreaBase.Thumb)`
	background-color: ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 8px;
	transition: background-color 0.2s ease-in-out;
`;

export const Scrollbar = styled(ScrollAreaBase.Scrollbar)`
	background-color: ${({ theme }) => theme.colors.background.card};
	width: 24px;
	background-clip: padding-box;
	border: 8px solid transparent;
	z-index: 90000;

	&:hover ${Thumb} {
		background-color: ${({ theme }) => theme.colors.onBackground.primary};
	}
`;

export const Corner = styled(ScrollAreaBase.Corner)``;
