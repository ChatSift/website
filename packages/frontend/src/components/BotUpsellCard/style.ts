import styled from '@emotion/styled';
import { RouterLink } from '~/components/Link';
import mediaQueries from '~/styles/breakpoints';

export const Base = styled(RouterLink)`
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	padding: 16px;
	width: 100%;
	height: 100%;
	gap: 12px;
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};

	${mediaQueries.dashboardMaxWidthMin} {
		width: 293px;
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 12px;
`;

export const BotTag = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 22px;
	font-weight: 550;
	color: ${({ theme }) => theme.colors.text.primary};
	line-height: 24px;
`;

export const UpsellDescription = styled.div`
	font-size: 18px;
	font-weight: 450;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.text.secondary};
`;
