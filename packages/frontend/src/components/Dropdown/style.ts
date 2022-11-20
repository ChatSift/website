import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Root as Label } from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';

const iconAndValueGap = 8;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;

	&[data-disabled='true'] {
		opacity: 0.5;
		pointer-events: none;
	}
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
	z-index: 90000;
`;

export const Viewport = styled(Select.Viewport)`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Group = styled(Select.Group)`
	&:not(:first-of-type) {
		margin-top: 16px;
	}
`;

export const GroupLabel = styled(Select.Label)`
	color: ${({ theme }) => theme.colors.text.secondary};
	border-bottom: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	margin-bottom: 8px;
	padding: 4px 8px;
	font-size: 14px;
`;

export const Item = styled(Select.Item)`
	padding: 8px;
	color: ${({ theme }) => theme.colors.text.primary};
	border-radius: 4px;
	cursor: pointer;
	outline: none;
	font-size: 18px;
  display: flex;
  align-items: center;
  gap: ${iconAndValueGap}px;

	&[data-state='checked'] {
		background-color: ${({ theme }) => theme.colors.accent};
		color: ${({ theme }) => theme.colors.text.onAccent};
		font-weight: 450;
	}

	&[data-highlighted]:not([data-state='checked']) {{
		background-color: ${({ theme }) => theme.colors.onBackground.secondary};
	}
`;

export const itemIcon = css`
	width: 18px;
	height: 18px;
`;

export const DropdownArrowIcon = styled(Select.Icon)`
	display: flex;
	align-items: center;
`;

export const ValueAndIcon = styled.span`
	display: flex;
	align-items: center;
	gap: ${iconAndValueGap}px;
	font-size: 18px;
	font-weight: 550;
	color: ${({ theme }) => theme.colors.text.primary};
`;

// export const Icon = styled(Select.Icon)`
// 	display: flex;
// 	align-items: center;
// `;

export const Trigger = styled(Select.Trigger)`
	background-color: ${({ theme }) => theme.colors.onBackground.tertiary};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 4px;
	padding: 12px;
	gap: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;

	&[data-placeholder] ${ValueAndIcon} {
		font-weight: 450;
		color: ${({ theme }) => theme.colors.text.secondary};
	}
`;
