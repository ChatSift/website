import styled from '@emotion/styled';

export const Base = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	align-items: center;
	justify-content: center;
	gap: 16px;
`;

export const Title = styled.h1`
	color: ${(props) => props.theme.colors.text.primary};
	font-size: 32px;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	gap: 16px;
`;
