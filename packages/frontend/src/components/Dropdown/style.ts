import styled from '@emotion/styled';
import { Root as Label } from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const DropdownMenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const DropdownLabel = styled(Label)`
	font-size: 16px;
	font-weight: 450;
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Content = styled(Select.Content)`
	padding: 8px;
	width: 100%;
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	background-color: ${({ theme }) => theme.colors.background.card};
	border-radius: 4px;
`;

export const Viewport = styled(Select.Viewport)`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Item = styled(Select.Item)`
	padding: 8px;
	color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  font-size: 18px;

  &[data-state='checked'] {
		background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text.onAccent};
    font-weight: 450;
  }

	&[data-highlighted]:not([data-state='checked']) {{
		background-color: ${({ theme }) => theme.colors.onBackground.secondary};
  }
`;

export const ValueAndIcon = styled.span`
	display: flex;
	align-items: center;
	gap: 12px;
	font-size: 18px;
	font-weight: 550;
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const Icon = styled(Select.Icon)`
	display: flex;
	align-items: center;
`;

export const Trigger = styled(Select.Trigger)`
	background-color: ${({ theme }) => theme.colors.onBackground.tertiary};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 4px;
	padding: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;

	&[data-placeholder] ${ValueAndIcon} {
		font-weight: 450;
		color: ${({ theme }) => theme.colors.text.secondary};
	}
`;
