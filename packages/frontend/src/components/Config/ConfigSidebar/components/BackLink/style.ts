import styled from '@emotion/styled';

export const BackLink = styled.span`
	color: ${({ theme }) => theme.colors.text.primary};
	border-bottom: 1px solid transparent;
	width: fit-content;
	font-size: 22px;
	font-weight: 550;

	&:hover {
		border-bottom: 1px solid ${({ theme }) => theme.colors.text.primary};
	}
`;

export const Anchor = styled.a`
	display: flex;
	gap: 8px;
	align-items: center;
`;
