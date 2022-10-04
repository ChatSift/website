import styled from '@emotion/styled';
import type { GetStaticPaths, GetStaticProps } from 'next';
import BotUpsellCard from '~/components/BotUpsellCard';
import * as Button from '~/components/Button';
import Footer from '~/components/Footer';
import Heading from '~/components/Heading';
import ImageSlideshow from '~/components/ImageSlideshow';
import PageMeta from '~/components/PageMeta';
import Review from '~/components/Review';
import SingleItemPaginator from '~/components/SingleItemPaginator';
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

const CtaTitle = styled.h2`
	font-size: 34px;
	font-weight: 550;
`;

const CtaText = styled.span`
	line-height: 24px;
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

const Title = styled.h2`
	font-size: 26px;
	font-weight: 550;

	&:not(:last-child) {
		margin-bottom: 8px;
	}
`;

const Text = styled.span`
	font-size: 18px;

	color: ${({ theme }) => theme.colors.text.secondary};
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

const FeatureName = styled.h3`
	font-size: 18px;
	font-weight: 450;
	color: ${({ theme }) => theme.colors.text.primary};

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
	const id = params?.name as string | undefined;

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

const CtaLink = Button.Cta.withComponent('a');
const GhostLink = Button.Ghost.withComponent('a');

function BotPage({ bot }: { bot: Bot | undefined }) {
	if (bot === undefined) {
		return (
			<>
				<PageMeta title="Bot not found" />
				<Container>Unknown bot</Container>
			</>
		);
	}

	const otherBots = Object.entries(bots).filter(([, b]) => b.name !== bot.name);

	return (
		<>
			<PageMeta title="Bot" />
			<Container>
				<section>
					<ImageSlideshow images={bot.slideshowImages} />
					<Cta>
						<CtaTitle>{bot.pageTitle}</CtaTitle>
						<CtaTextContainer>
							{bot.description.page.map((line, index) => (
								<CtaText key={index}>{line}</CtaText>
							))}
						</CtaTextContainer>
						<CtaButtons>
							<CtaLink href={bot.inviteLink}>Add to server</CtaLink>
							<GhostLink href="/support" hasBorder>
								Get support
							</GhostLink>
						</CtaButtons>
					</Cta>
				</section>
				<section>
					<SectionHeader>
						<Title>{bot.featureList.title}</Title>
						<Text>{bot.featureList.text}</Text>
					</SectionHeader>
					<Features data-hide-on-mobile>
						{bot.featureList.features.map(({ name, description }, index) => (
							<Feature key={`${name}-${index}`}>
								<FeatureName>{name}</FeatureName>
								<span>{description}</span>
							</Feature>
						))}
					</Features>
					<div data-hide-on-desktop="">
						{/* @ts-expect-error TS2745 */}
						<SingleItemPaginator>
							{[...(Array.from({ length: Math.ceil(bot.featureList.features.length / 3) }) as unknown[])].map(
								(_, index) => (
									<Features key={`page-${index}`}>
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
							<Title>{bot.reviews.title}</Title>
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
							<Title>Check out our other bots</Title>
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
						subtitle="Support us on Kofi to help maintain these tools and live happily ever after"
						gap={12}
					/>
					<CtaLink href="/kofi">Donate</CtaLink>
				</DonationUpsellSection>
			</Container>
			<Footer />
		</>
	);
}

export default BotPage;
