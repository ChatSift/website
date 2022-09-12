import styled from '@emotion/styled';
import mediaQueries from '~/styles/breakpoints';
export const buttonPadding = 6;

export const CopyrightNotice = styled.span`
	white-space: nowrap;
`;

export const FooterBase = styled.footer`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px 0;
	gap: 16px;
	border-top: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
	color: ${(props) => props.theme.colors.text.secondary};
	font-weight: 450;
	margin-top: 32px;

	${mediaQueries.smallMin} {
		flex-direction: row;
		align-items: center;
		padding: ${16 - buttonPadding}px 0;
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

export const IconLink = styled.a`
	display: flex;
`;
