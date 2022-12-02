import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import * as AlertDialogStyles from '~/components/AlertDialog/style';
import * as Text from '~/components/Text';

export const InputLabel = styled(Label)`
	font-size: 16px;
	font-weight: 550;
	color: ${({ theme }) => theme.colors.text.secondary};
	margin-bottom: 8px;

	&:not(:first-of-type) {
		margin-top: 16px;
	}
`;

export const DialogOverlay = AlertDialogStyles.Overlay.withComponent(Dialog.Overlay);
export const DialogContent = AlertDialogStyles.Content.withComponent(Dialog.Content);
export const DialogTitle = AlertDialogStyles.Title.withComponent(Dialog.Title);
export const DialogDescription = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.background.card};
	color: ${({ theme }) => theme.colors.text.primary};
	padding: 16px;
	font-size: 18px;
`;

export const DialogButtons = styled.div`
	display: flex;
	justify-content: flex-end;
	border-top: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	padding: 12px 16px;
	gap: 8px;
`;

export const CharacterLimit = styled(Text.Caption.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
	margin-top: 4px;
	transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
	transform-origin: left center;

	&[data-exceeded='true'] {
		color: ${({ theme }) => theme.colors.danger};
		transform: scale(1.1);
	}
`;
