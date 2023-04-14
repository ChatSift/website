import styledOld from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import { Text } from '~/components/Text';
import { styled } from '~/stitches/stitches.config';
import mediaQueries from '~/styles/breakpoints';

type CardProps = {
	wide: boolean;
};

export const Card = styledOld.article<CardProps>`
	display: flex;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	padding: 8px;

	${mediaQueries.smallMin} {
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

export const GuildImage = styledOld.img<GuildImageProps>`
	display: flex !important;
	justify-content: center;
	align-items: center;
	width: ${({ large }) => (large ? 64 : 48)}px;
	height: ${({ large }) => (large ? 64 : 48)}px;
	border-radius: 100%;
	border: 1px solid ${(props) => props.theme.colors.onBackground.secondary};
`;

export const GuildAcronym = styledOld(GuildImage.withComponent('div'))`
	&::after {
		color: ${({ theme }) => theme.colors.text.primary};
		max-width: 70%;
		content: attr(data-full);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export const SkeletonGuildImage = GuildImage.withComponent(Skeleton);

export const CardHeader = styledOld.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1 1 auto;
	min-width: 0;
`;

// export const GuildNameWide = styledOld(Heading3)`
// 	color: ${({ theme }) => theme.colors.text.primary};
// 	text-overflow: ellipsis;
// 	overflow: hidden;
// 	white-space: nowrap;
// `;

export const GuildName = styled(Text, {
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
});
