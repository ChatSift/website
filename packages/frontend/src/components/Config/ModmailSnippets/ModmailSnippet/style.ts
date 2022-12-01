import styled from '@emotion/styled';

export const Snippet = styled.article`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 4px;
`;

export const SnippetHeader = styled.div`
	display: flex;
	background-color: ${({ theme }) => theme.colors.onBackground.tertiary};
	border-bottom: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	padding: 12px;
	color: ${({ theme }) => theme.colors.text.primary};
	font-weight: 500;
	font-size: 20px;
`;

export const SnippetBody = styled.div`
	color: ${({ theme }) => theme.colors.text.secondary};
	padding: 24px 12px;
	font-size: 16px;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	gap: 8px;
	background-color: ${({ theme }) => theme.colors.onBackground.tertiary};
	border-top: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	padding: 12px;
`;
