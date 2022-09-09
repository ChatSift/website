import styled from '@emotion/styled';
import mediaQueries from '~/styles/breakpoints';

export const GuildCardBase = styled.a`
	display: flex;
	flex-direction: column;
	padding: 16px;
	gap: 12px;
	max-width: 216px;
	border-radius: 8px;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
	width: 156px;
	height: 144px;

	&[data-is-invited='true'] {
		background-color: ${(props) => props.theme.colors.background.card};
	}

	&:not([data-skeleton='true']) {
		cursor: pointer;
	}

	${mediaQueries.smallMin} {
		width: 216px;
	}
`;

export const NotInvited = styled.span`
	color: ${(props) => props.theme.colors.text.secondary};
	font-size: 16px;
`;

export const GuildImage = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 100%;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
`;

export const NameAndBots = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const GuildTitle = styled.h3`
	font-size: 18px;
	color: ${(props) => props.theme.colors.text.primary};
	font-weight: 550;
	margin: 0;
	white-space: nowrap;
	width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
`;

export const BotList = styled.ul`
	display: flex;
	flex-direction: row;
	gap: 4px;
`;
