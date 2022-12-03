import styled from '@emotion/styled';
import * as Button from '~/components/Button';
import { RouterLink } from '~/components/Link';
import * as Text from '~/components/Text';
import mediaQueries from '~/styles/breakpoints';

export const Upsell = styled.div`
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.tertiary};
	border-radius: 8px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	justify-content: space-between;

	${mediaQueries.dashboardMaxWidthMin} {
		flex-direction: row;
	}
`;

export const Main = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const Buttons = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	align-items: flex-start;

	${mediaQueries.smallMin} {
		flex-direction: row;
		align-items: center;
	}
`;

export const GhostLink = Button.Ghost.withComponent(RouterLink);
export const CtaLink = Button.Cta.withComponent(RouterLink);

export const Title = styled(Text.Heading4)`
	display: flex;
	flex-direction: row;
	gap: 6px;
`;

export const Description = styled(Text.Body.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;
