import styled from '@emotion/styled';
import { Frame } from '~/components/Config/ConfigPageFrame/style';

export const Base = styled(Frame)`
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 16px;
`;

export const Title = styled.span`
	color: ${(props) => props.theme.colors.text.primary};
	font-size: 32px;
`;

export const Description = styled.span`
	color: ${(props) => props.theme.colors.text.secondary};
	font-size: 24px;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	gap: 16px;
	margin-top: 16px;
`;
