import type { GetStaticPaths, GetStaticProps } from 'next';
import { Fragment } from 'react';
import BotUpsellCard from '~/components/BotUpsellCard';
import { Button } from '~/components/Button';
import { ButtonLink } from '~/components/ButtonLink';
import Footer from '~/components/Footer';
import Heading from '~/components/Heading';
import ImageSlideshow from '~/components/ImageSlideshow';
import PageMeta from '~/components/PageMeta';
import Review from '~/components/Review';
import SingleItemPaginator from '~/components/SingleItemPaginator';
import { Text } from '~/components/Text';
import bots from '~/data/bots';
import { styled, theme, globalCss } from '~/stitches/stitches.config';
import { mediaQueriesRaw } from '~/styles/breakpoints';
import { dashboardMaxWidth, dashboardPadding, smallestDashboardWidth } from '~/utils/constants';

const hideOnDevices = globalCss({
	[`@media (max-width: ${mediaQueriesRaw.dashboardMaxWidth}px)`]: {
		'[data-hide-on-mobile]': {
			display: 'none !important',
		},
	},
	[`@media (min-width: ${mediaQueriesRaw.dashboardMaxWidth}px)`]: {
		'[data-hide-on-desktop]': {
			display: 'none !important',
		},
	},
});

const Container = styled('main', {
	displayFlex: 'column',
	paddingTop: theme.space.lg,
	flex: '1 0 auto',
	width: '80vw',
	gap: theme.space.huge,
	alignItems: 'stretch',

	variants: {
		mobile: {
			true: {
				maxWidth: smallestDashboardWidth - dashboardPadding * 2,
			},
			false: {
				maxWidth: dashboardMaxWidth,
			},
		},
	},
});

const Cta = styled('div', {
	displayFlex: 'column',
	gap: theme.space.md,
	marginTop: theme.space.xxl,
});

const CtaButtons = styled('div', {
	displayFlex: 'row',
	gap: theme.space.lg,
});

const CtaTextContainer = styled('div', {
	displayFlex: 'column',
});

const Features = styled('ul', {
	display: 'grid',
	gap: theme.space.xl,
	marginTop: theme.space.lg,

	variants: {
		columns: {
			one: {
				gridTemplateColumns: '1fr',
			},
			two: {
				gridTemplateColumns: '1fr 1fr',
			},
		},
	},
});

const Feature = styled('li', {
	padding: theme.space.lg,
	displayFlex: 'column',
	gap: theme.space.sm,
	backgroundColor: theme.colors.bgCard,
	borderWidth: theme.borderWidths.thin,
	borderStyle: theme.borderStyles.normal,
	borderColor: theme.colors.onBgSecondary,
	borderRadius: theme.radii.lg,
});

const FeatureName = styled(Text, {
	'&::before': {
		color: theme.colors.miscAccent,
		marginRight: theme.space.sm,
		content: '•',
	},
});

const BotList = styled('ul', {
	display: 'flex',
	gap: theme.space.lg,

	variants: {
		direction: {
			column: {
				flexDirection: 'column',
			},
			row: {
				flexDirection: 'row',
			},
		},
	},
});

const SectionHeader = styled('div', {
	marginBottom: theme.space.lg,
});

const SectionTitle = styled(Text, {
	'&:not(:last-child)': {
		marginBottom: theme.space.sm,
	},
});

const DonationUpsellSection = styled('section', {
	display: 'flex',
	gap: theme.space.xl,

	variants: {
		direction: {
			column: {
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
			},
			row: {
				flexDirection: 'row',
				alignItems: 'center',
			},
		},
	},
});

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
	hideOnDevices();

	if (bot === undefined) {
		return (
			<>
				<PageMeta title="Bot not found" />
				<Container
					mobile={{
						'@initial': true,
						'@dashboardMaxWidth': false,
					}}
				>
					Unknown bot
				</Container>
			</>
		);
	}

	const otherBots = Object.entries(bots).filter(([, b]) => b.name !== bot.name) as Entries<typeof bots>;

	return (
		<Fragment key={bot.name /* diff key for each bot forces reset of state, etc */}>
			<PageMeta title={bot.name} description={bot.description.card} />
			<Container
				mobile={{
					'@initial': true,
					'@dashboardMaxWidth': false,
				}}
			>
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
							<Button as={ButtonLink} href={bot.inviteLink} buttonType="callToAction" external>
								Add to server
							</Button>
							<Button as={ButtonLink} href="/support" buttonType="ghost" ghostHasBorder external>
								Get support
							</Button>
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
					<Features data-hide-on-mobile columns="two">
						{bot.featureList.features.map(({ name, description }, index) => (
							<Feature key={`${name}-${index}`}>
								<FeatureName kind="body" color="primary">
									{name}
								</FeatureName>
								<Text kind="caption">{description}</Text>
							</Feature>
						))}
					</Features>
					<div data-hide-on-desktop="">
						{/* @ts-expect-error TS2745 */}
						<SingleItemPaginator>
							{[...(Array.from({ length: Math.ceil(bot.featureList.features.length / 3) }) as unknown[])].map(
								(_, index) => (
									<Features style={{ gridTemplateRows: '1fr 1fr 1fr' }} key={`page-${index}`} columns="one">
										{bot.featureList.features.slice(index * 3, index * 3 + 3).map(({ name, description }, jIndex) => (
											<Feature key={`feat-${name}-${index}-${jIndex}`}>
												<FeatureName kind="body" color="primary">
													{name}
												</FeatureName>
												<Text kind="caption">{description}</Text>
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
						<BotList
							direction={{
								'@initial': 'column',
								'@dashboardMaxWidth': 'row',
							}}
						>
							{otherBots.map(([pathName, bot]) => (
								<li key={pathName}>
									<BotUpsellCard bot={bot} pathName={pathName} />
								</li>
							))}
						</BotList>
					</section>
				)}
				<DonationUpsellSection
					direction={{
						'@initial': 'column',
						'@dashboardMaxWidth': 'row',
					}}
				>
					<Heading
						title="Help keep the project alive"
						subtitle="Donate on Kofi to help support the apps we're developing."
					/>
					<Button as={ButtonLink} href="/kofi" buttonType="callToAction" external>
						Donate
					</Button>
				</DonationUpsellSection>
			</Container>
			<Footer />
		</Fragment>
	);
}

export default BotPage;
