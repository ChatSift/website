import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import { Body, Caption, Heading3 } from '~/components/Text';
import breakpoints from '~/styles/breakpoints';

type CardProps = {
	wide: boolean;
};

export const Card = styled.article<CardProps>`
	display: flex;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	padding: 8px;

	${breakpoints.smallMin} {
		padding: 16px;
	}

	${({ wide }) =>
		wide
			? `
					flex-direction: row;
					align-items: center;
					gap: 16px;
				`
			: `
					flex-direction: column;
					gap: 8px;
				`}

	// hack to make the skeleton not take up too much height
	> span {
		display: flex;
	}
`;

type GuildImageProps = {
	large: boolean;
};

export const GuildImage = styled.img<GuildImageProps>`
	display: flex !important;
	justify-content: center;
	align-items: center;
	width: ${({ large }) => (large ? 64 : 48)}px;
	height: ${({ large }) => (large ? 64 : 48)}px;
	border-radius: 100%;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
`;

export const SkeletonGuildImage = GuildImage.withComponent(Skeleton);

export const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1 1 auto;
	min-width: 0;
`;

export const GuildName = styled(Body.Bold)`
	color: ${({ theme }) => theme.colors.text.primary};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const GuildNameWide = styled(Heading3)`
	color: ${({ theme }) => theme.colors.text.primary};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const GuildMemberCount = styled(Caption.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export const GuildMemberCountWide = styled(Body.Regular)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;
