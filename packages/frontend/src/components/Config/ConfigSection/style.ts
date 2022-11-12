import styled from '@emotion/styled';
import { Body } from '~/components/Text';

export const ConfigSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 16px;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
`;

export const SectionHeader = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Description = styled(Body.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;
