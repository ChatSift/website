import styled from '@emotion/styled';
import { Body } from '~/components/Text';

export const DirtyBar = styled.div`
	position: sticky;
	bottom: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.background.card};
	padding: 8px 16px;
	transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
	transform: translateY(0);
	opacity: 1;
	margin-top: auto;

	&[data-hidden='true'] {
		transform: translateY(10px);
		opacity: 0;
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
