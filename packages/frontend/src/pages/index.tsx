import { default as NextLink } from 'next/link';
import { Button } from '~/components/Button';
import { ButtonLink } from '~/components/ButtonLink';
import Footer from '~/components/Footer';
import Heading from '~/components/Heading';
import bots, { botIcons } from '~/data/bots';
import { config, styled, theme } from '~/stitches/stitches.config';
import * as Urls from '~/utils/urls';

const Container = styled('main', {
	paddingTop: theme.space.xxl,
	flex: '1 0 auto',
	displayFlex: 'column',
	width: '80vw',
	gap: theme.space.xxl,
	alignItems: 'stretch',
	color: theme.colors.textPrimary,

	variants: {
		view: {
			desktop: {
				maxWidth: theme.sizes.dashboardMaxWidth,
			},
			mobile: {
				maxWidth: `calc(${theme.sizes.smallestDashboardWidth} - ${theme.space.dashboardPadding} * 2)`,
			},
		},
	},
});

const CtaSection = styled('div', {
	displayFlex: 'column',
	gap: theme.space.xl,

	variants: {
		padding: {
			present: {
				paddingY: theme.space.lg,
			},
			none: {
				padding: 0,
			},
		},
	},
});

const Slogan = styled('h2', {
	fontSize: theme.fontSizes.five,
	fontWeight: theme.fontWeights.bold,
});

const CtaButtons = styled('div', {
	display: 'flex',
	gap: theme.space.lg,

	variants: {
		view: {
			mobile: {
				flexDirection: 'column',
			},
			desktop: {
				flexDirection: 'row',
				alignItems: 'center',
			},
		},
	},
});

const SubTitle = styled('h3', {
	fontSize: theme.fontSizes.four,
	fontWeight: theme.fontWeights.bold,
});

const BotsList = styled('ul', {
	display: 'grid',
	gap: theme.space.xl,

	variants: {
		columns: {
			single: {
				gridTemplateColumns: '1fr',
				gridTemplateRows: `repeat(${Object.entries(bots).length}, 1fr)`,
			},
			double: {
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: `repeat(${Math.ceil(Object.entries(bots).length / 2)}, 1fr)`,
			},
		},
	},
});

const BotCard = styled('a', {
	displayFlex: 'column',
	gap: theme.space.md,
	padding: theme.space.lg,
	backgroundColor: theme.colors.bgCard,
	border: `1px solid ${theme.colors.onBgSecondary}`,
	borderRadius: theme.radii.lg,
	cursor: 'pointer',
	height: '100%',
});

const BotCardHeader = styled('div', {
	displayFlex: 'row',
	gap: theme.space.xs,
	alignItems: 'center',
	fontSize: theme.fontSizes.three,
	fontWeight: theme.fontWeights.bold,
});

const BotLogo = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: 44,
	height: 44,
});

const BotDescription = styled('div', {
	fontSize: theme.fontSizes.two,
	fontWeight: theme.fontWeights.thin,
	maxWidth: '75%',
	color: theme.colors.textSecondary,
});

// const CustomSolutionUpsell = oldStyled.li`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	gap: 12px;
// 	padding: 16px;
// 	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
// 	border-radius: 8px;
// `;
//
// const UpsellTitle = oldStyled.span`
// 	font-size: 22px;
// 	font-weight: 550;
// `;
//
// const UpsellLink = oldStyled(Link)`
// 	color: ${({ theme }) => theme.colors.accent};
// 	font-weight: 440;
//
// 	&:hover {
// 		text-decoration: underline;
// 	}
// `;

const BotSection = styled('div', {
	displayFlex: 'column',
	gap: theme.space.lg,
});

const DonateHeading = styled('div', {
	gap: theme.space.xxl,
	justifyContent: 'space-between',

	variants: {
		direction: {
			horizontal: {
				displayFlex: 'row',
				alignItems: 'center',
			},
			vertical: {
				displayFlex: 'column',
				alignItems: 'flex-start',
			},
		},
	},
});

function Home() {
	return (
		<>
			<Container
				view={{
					'@initial': 'mobile',
					[config.media.dashboardMaxWidth]: 'desktop',
				}}
			>
				<CtaSection
					padding={{
						'@initial': 'present',
						'@small': 'none',
					}}
				>
					<Slogan>Modern solutions for modern problems</Slogan>
					<CtaButtons
						view={{
							'@initial': 'mobile',
							[config.media.small]: 'desktop',
						}}
					>
						<Button as={ButtonLink} buttonType="callToAction" href="/support" external>
							Join our Discord server
						</Button>
						{/* <Button.Ghost hasBorder>Read our blog</Button.Ghost> */}
					</CtaButtons>
				</CtaSection>
				<BotSection>
					<SubTitle>Our bots</SubTitle>
					<BotsList
						columns={{
							'@initial': 'single',
							[config.media.small]: 'double',
						}}
					>
						{(Object.entries(bots) as Entries<typeof bots>).map(
							([
								pathName,
								{
									name,
									description: { card: cardDescription },
								},
							]) => {
								const Icon = botIcons[pathName]!;

								return (
									<li key={name}>
										<NextLink href={Urls.botPage(pathName)}>
											<BotCard href={Urls.botPage(pathName)}>
												<BotCardHeader>
													<BotLogo>
														<Icon width={32} height={32} />
													</BotLogo>
													{name}
												</BotCardHeader>
												<BotDescription>{cardDescription}</BotDescription>
											</BotCard>
										</NextLink>
									</li>
								);
							},
						)}
						{/* <CustomSolutionUpsell> */}
						{/* 	<UpsellTitle>Need a custom solution?</UpsellTitle> */}
						{/* 	<span> */}
						{/* 		<UpsellLink href="https://www.youtube.com/watch?v=Sk217hyDmHo">Get in touch</UpsellLink> and we{"'"}ll */}
						{/* 		help you out */}
						{/* 	</span> */}
						{/* </CustomSolutionUpsell> */}
					</BotsList>
				</BotSection>
				<DonateHeading
					direction={{
						'@initial': 'vertical',
						'@small': 'horizontal',
					}}
				>
					<Heading title="Support the project" subtitle="Donate on Kofi to help support the apps we're developing." />
					<Button as={ButtonLink} buttonType="callToAction" href="/kofi" external>
						Donate
					</Button>
				</DonateHeading>
			</Container>
			<Footer />
		</>
	);
}

export default Home;
