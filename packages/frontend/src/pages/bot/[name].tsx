import styled from '@emotion/styled';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Fragment } from 'react';
import BotUpsellCard from '~/components/BotUpsellCard';
import ButtonLink from '~/components/ButtonLink';
import Footer from '~/components/Footer';
import Heading from '~/components/Heading';
import ImageSlideshow from '~/components/ImageSlideshow';
import PageMeta from '~/components/PageMeta';
import Review from '~/components/Review';
import SingleItemPaginator from '~/components/SingleItemPaginator';
import { Text } from '~/components/Text';
import bots from '~/data/bots';
import mediaQueries from '~/styles/breakpoints';
import { dashboardMaxWidth, dashboardPadding, smallestDashboardWidth } from '~/utils/constants';

const Container = styled.main`
	padding-top: 16px;
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	max-width: ${dashboardMaxWidth}px;
	width: 80vw;
	gap: 48px;
	align-items: stretch;
	color: ${({ theme }) => theme.colors.text.primary};

	${mediaQueries.dashboardMaxWidthMax} {
		max-width: ${smallestDashboardWidth - dashboardPadding * 2}px;

		& *[data-hide-on-mobile] {
			display: none;
		}
	}
	& *[data-hide-on-desktop] {
		display: initial;
	}

	${mediaQueries.dashboardMaxWidthMin} {
		& *[data-hide-on-desktop] {
			display: none;
		}
	}
`;

const Cta = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 32px;
`;

const CtaButtons = styled.span`
	display: flex;
	flex-direction: row;
	gap: 16px;
`;

const Features = styled.ul`
	display: grid;
	grid-template-columns: 1fr;
	gap: 24px;
	margin-top: 16px;

	${mediaQueries.dashboardMaxWidthMin} {
		grid-template-columns: 1fr 1fr;
	}
`;

const BotList = styled.ul`
	display: flex;
	gap: 16px;
	flex-direction: column;

	${mediaQueries.dashboardMaxWidthMin} {
		flex-direction: row;
	}
`;

const SectionHeader = styled.div`
	margin-bottom: 16px;
`;

const SectionTitle = styled(Text)`
	&:not(:last-child) {
		margin-bottom: 8px;
	}
`;

const Feature = styled.li`
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 8px;
	background-color: ${({ theme }) => theme.colors.background.card};
	color: ${({ theme }) => theme.colors.text.secondary};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 8px;
`;

const FeatureName = styled(Text)`
	&::before {
		color: ${({ theme }) => theme.colors.accent};
		margin-right: 8px;
		content: '•';
	}
`;

const CtaTextContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const DonationUpsellSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 24px;
	align-items: flex-start;

	${mediaQueries.dashboardMaxWidthMin} {
		flex-direction: row;
		align-items: center;
	}
`;

export const getStaticPaths: GetStaticPaths = () => {
	const paths = Object.keys(bots).map((bot) => ({
		params: {
			name: bot,
		},
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = ({ params }) => {
	const id = params?.name as BotId | undefined;

	if (id === undefined || !(id in bots)) {
		return {
			props: { bot: undefined },
		};
	}

	const bot = bots[id];

	return {
		props: {
			bot,
		},
	};
};

function BotPage({ bot }: { bot: Bot | undefined }) {
	if (bot === undefined) {
		return (
			<>
				<PageMeta title="Bot not found" />
				<Container>Unknown bot</Container>
			</>
		);
	}

	const otherBots = Object.entries(bots).filter(([, b]) => b.name !== bot.name) as Entries<typeof bots>;

	return (
		<Fragment key={bot.name /* diff key for each bot forces reset of state, etc */}>
			<PageMeta title={bot.name} description={bot.description.card} />
			<Container>
				<section>
					<ImageSlideshow images={bot.slideshowImages} imageWidths={bot.slideshowImageWidths} />
					<Cta>
						<Text kind="title" color="primary" weight="bold">
							{bot.pageTitle}
						</Text>
						<CtaTextContainer>
							{bot.description.page.map((line, index) => (
								<Text key={index}>{line}</Text>
							))}
						</CtaTextContainer>
						<CtaButtons>
							<ButtonLink.Cta href={bot.inviteLink} external>
								Add to server
							</ButtonLink.Cta>
							<ButtonLink.Ghost href="/support" hasBorder external>
								Get support
							</ButtonLink.Ghost>
						</CtaButtons>
					</Cta>
				</section>
				<section>
					<SectionHeader>
						<SectionTitle kind="subtitle" color="primary" weight="bold">
							{bot.featureList.title}
						</SectionTitle>
						<Text>{bot.featureList.text}</Text>
					</SectionHeader>
					<Features data-hide-on-mobile>
						{bot.featureList.features.map(({ name, description }, index) => (
							<Feature key={`${name}-${index}`}>
								<FeatureName kind="body" color="primary">
									{name}
								</FeatureName>
								<span>{description}</span>
							</Feature>
						))}
					</Features>
					<div data-hide-on-desktop="">
						{/* @ts-expect-error TS2745 */}
						<SingleItemPaginator>
							{[...(Array.from({ length: Math.ceil(bot.featureList.features.length / 3) }) as unknown[])].map(
								(_, index) => (
									<Features
										style={{ gridTemplateRows: '1fr '.repeat(Math.ceil(bot.featureList.features.length / 3)) }}
										key={`page-${index}`}
									>
										{bot.featureList.features.slice(index * 3, index * 3 + 3).map(({ name, description }, jIndex) => (
											<Feature key={`feat-${name}-${index}-${jIndex}`}>
												<FeatureName>{name}</FeatureName>
												<span>{description}</span>
											</Feature>
										))}
									</Features>
								),
							)}
						</SingleItemPaginator>
					</div>
				</section>
				{bot.reviews && (
					<section>
						<SectionHeader>
							<SectionTitle kind="subtitle" color="primary" weight="bold">
								{bot.reviews.title}
							</SectionTitle>
						</SectionHeader>
						{/* @ts-expect-error TS2745 */}
						<SingleItemPaginator>
							{bot.reviews.reviews.map(({ content, author }) => (
								<Review content={content} author={author} key={author.name} />
							))}
						</SingleItemPaginator>
					</section>
				)}
				{otherBots.length > 0 && (
					<section>
						<SectionHeader>
							<SectionTitle kind="subtitle" color="primary" weight="bold">
								Check out our other bots
							</SectionTitle>
						</SectionHeader>
						<BotList>
							{otherBots.map(([pathName, bot]) => (
								<li key={pathName}>
									<BotUpsellCard bot={bot} pathName={pathName} />
								</li>
							))}
						</BotList>
					</section>
				)}
				<DonationUpsellSection>
					<Heading
						title="Help keep the project alive"
						subtitle="Donate on Kofi to help support the apps we're developing."
					/>
					<ButtonLink.Cta href="/kofi" external>
						Donate
					</ButtonLink.Cta>
				</DonationUpsellSection>
			</Container>
			<Footer />
		</Fragment>
	);
}

export default BotPage;
