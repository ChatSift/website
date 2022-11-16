import styled from '@emotion/styled';
import { Body } from '~/components/Text';
import mediaQueries from '~/styles/breakpoints';

export const DirtyBar = styled.div`
	position: absolute;
	bottom: 16px;
	left: 16px;
	right: 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.onBackground.tertiary};
	padding: 8px 16px;
	transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
	transform: translateY(0);
	opacity: 1;

	&[data-hidden='true'] {
		transform: translateY(10px);
		opacity: 0;
	}

	${mediaQueries.smallMin} {
		bottom: 24px;
		left: 24px;
		right: 24px;
	}
`;

export const DirtyBarText = styled(Body.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DirtyBarButtons = styled.div`
	display: flex;
	flex-direction: row;
	gap: 8px;
`;
