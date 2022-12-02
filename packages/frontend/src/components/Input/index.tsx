import styled from '@emotion/styled';

export const Input = styled.input`
	background-color: ${(props) => props.theme.colors.onBackground.tertiary};
	font-weight: 450;
	font-size: 18px;
	color: ${(props) => props.theme.colors.text.primary};
	border-radius: 8px;
	padding: 12px ${16 * 3}px 12px 16px;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};

	&::placeholder {
		color: ${(props) => props.theme.colors.text.secondary};
	}

	&:focus {
		&::placeholder {
			color: ${(props) => props.theme.colors.text.primary};
		}

		border: 1px solid ${(props) => props.theme.colors.text.primary};
	}

	&[data-invalid='true'] {
		border: 1px solid ${({ theme }) => theme.colors.danger};
	}
`;
