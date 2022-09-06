import styled from '@emotion/styled';

export const BaseSkipLink = styled.a`
	position: fixed;
	top: -200px;
	z-index: 1000;
	background-color: ${({ theme }) => theme.colors.accent};
	color: white;
	padding: 1rem;

	&:focus {
		top: 0;
	}
`;
