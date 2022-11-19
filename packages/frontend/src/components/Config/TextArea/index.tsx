import styled from '@emotion/styled';

export const TextArea = styled.textarea`
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
	background-color: ${(props) => props.theme.colors.onBackground.tertiary};
	color: ${(props) => props.theme.colors.text.primary};
	border-radius: 4px;
	padding: 8px;
	resize: vertical;
`;
