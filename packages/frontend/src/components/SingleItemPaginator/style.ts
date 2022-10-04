import styled from '@emotion/styled';

export const buttonPadding = 4;

export const Base = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const Content = styled.ul`
	display: grid;
	flex-direction: row;
	min-width: 100%;
`;

export const Controls = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: ${12 - buttonPadding}px;
`;

export const CurrentPage = styled.div`
	font-weight: 450;
	font-size: 18px;
`;
