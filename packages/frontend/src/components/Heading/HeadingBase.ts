import styled from '@emotion/styled';

export const HeadingBase = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Title = styled.h1`
	font-size: 26px;
	font-weight: 550;
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subtitle = styled.h2`
	font-size: 18px;
	font-weight: 450;
	color: ${({ theme }) => theme.colors.text.secondary};
`;
