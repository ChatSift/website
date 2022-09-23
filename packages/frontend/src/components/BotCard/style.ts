import styled from '@emotion/styled';

export const BotCardBase = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	background-color: ${(props) => props.theme.colors.background.card};
	padding: 16px;
	border-radius: 8px;
`;

export const Title = styled.span`
	display: flex;
	gap: 6px;
	font-weight: 550;
	color: ${(props) => props.theme.colors.text.primary};
	font-size: 22px;
`;

export const Description = styled.span`
	color: ${(props) => props.theme.colors.text.secondary};
	font-size: 18px;
	font-weight: 450;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	gap: 12px;
	margin-top: auto;

	& > * {
		flex: 1;
	}
`;
