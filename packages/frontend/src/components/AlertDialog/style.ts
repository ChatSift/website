import styled from '@emotion/styled';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { dialogOverlayColor } from '~/utils/constants';

export const Overlay = styled(AlertDialog.Overlay)`
	position: fixed;
	inset: 0;
	background-color: ${dialogOverlayColor};
	z-index: 99999;
`;

export const Content = styled(AlertDialog.Content)`
	background-color: ${({ theme }) => theme.colors.background.default};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 4px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	max-width: 500px;
	z-index: 100000;

	&[data-loading='true']::after {
		content: '';
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.3);
		cursor: not-allowed;
	}
`;

export const Title = styled(AlertDialog.Title)`
	color: ${({ theme }) => theme.colors.text.primary};
	font-size: 24px;
	font-weight: 550;
	padding: 12px 16px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
`;

export const Description = styled(AlertDialog.Description)`
	background-color: ${({ theme }) => theme.colors.background.card};
	color: ${({ theme }) => theme.colors.text.primary};
	padding: 24px 16px;
	font-size: 18px;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	gap: 16px;
	padding: 12px 16px;
	border-top: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
`;
