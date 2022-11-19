import styled from '@emotion/styled';
import { RouterLink } from '~/components/Link';
import mediaQueries from '~/styles/breakpoints';

export const buttonPadding = 6;

export const CopyrightNotice = styled.span`
	white-space: nowrap;
`;

export const Footer = styled.footer`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px;
	gap: 16px;
	border-top: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
	color: ${(props) => props.theme.colors.text.secondary};
	font-weight: 450;

	&[data-has-margin='true'] {
		margin-top: 32px;
	}

	${mediaQueries.smallMin} {
		flex-direction: row;
		align-items: center;
		padding: ${24 - buttonPadding}px 24px;
	}
`;

export const List = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const ButtonsAndLinks = styled(List)`
	justify-content: space-between;

	width: 100%;
`;

export const SecondGroup = styled.div`
	display: flex;
	align-items: center;
`;

export const IconLink = styled(RouterLink)`
	display: flex;
`;
