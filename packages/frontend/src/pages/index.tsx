import styled from '@emotion/styled';
import { default as NextLink } from 'next/link';
import * as Button from '~/components/Button';
import Footer from '~/components/Footer';
import Heading from '~/components/Heading';
import Link from '~/components/Link';
import bots, { botIcons } from '~/data/bots';
import mediaQueries from '~/styles/breakpoints';
import SvgLinkExternal from '~/svg/SvgLinkExternal';
import { dashboardMaxWidth, dashboardPadding, smallestDashboardWidth } from '~/utils/constants';
import * as Urls from '~/utils/urls';

const Container = styled.main`
	padding-top: 32px;
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	max-width: ${dashboardMaxWidth}px;
	width: 80vw;
	gap: 32px;
	align-items: stretch;
	color: ${({ theme }) => theme.colors.text.primary};

	${mediaQueries.dashboardMaxWidthMax} {
		max-width: ${smallestDashboardWidth - dashboardPadding * 2}px;
	}
`;

const CtaSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 16px 0;

	${mediaQueries.smallMin} {
		padding: 0;
	}
`;

const Slogan = styled.h2`
	font-size: 34px;
	font-weight: 550;
`;

const CtaButtons = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;

	${mediaQueries.smallMin} {
		flex-direction: row;
		align-items: center;
	}
`;

const SubTitle = styled.h3`
	font-size: 26px;
	font-weight: 550;
`;

const BotsList = styled.ul`
	display: grid;
	gap: 24px;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(${Object.entries(bots).length + 1}, 1fr);

	${mediaQueries.smallMin} {
		grid-template-columns: repeat(2, 1fr);
		// we do + 1 to the length because we have a custom solution upsell
		grid-template-rows: repeat(${Math.ceil((Object.entries(bots).length + 1) / 2)}, 1fr);
	}
`;

const BotCard = styled.a`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px;
	background-color: ${({ theme }) => theme.colors.background.card};
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 8px;
	cursor: pointer;
	height: 100%;
`;

const BotCardHeader = styled.div`
	display: flex;
	flex-direction: row;
	gap: 6px;
	align-items: center;
	font-size: 22px;
	font-weight: 550;
`;

const BotLogo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 44px;
	height: 44px;
`;

const BotDescription = styled.div`
	font-size: 18px;
	font-weight: 440;
	max-width: 75%;
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const CustomSolutionUpsell = styled.li`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 12px;
	padding: 16px;
	border: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	border-radius: 8px;
`;

const UpsellTitle = styled.span`
	font-size: 22px;
	font-weight: 550;
`;

const UpsellLink = styled(Link)`
	color: ${({ theme }) => theme.colors.accent};
	font-weight: 440;

	&:hover {
		text-decoration: underline;
	}
`;

const BotSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const DonateHeading = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;
	justify-content: space-between;
	align-items: flex-start;

	${mediaQueries.smallMin} {
		flex-direction: row;
		align-items: center;
	}
`;

const CtaLink = Button.Cta.withComponent('a');

function Home() {
	return (
		<>
			<Container>
				<CtaSection>
					<Slogan>Modern solutions for modern problems</Slogan>
					<CtaButtons>
						<CtaLink href="/support">
							<SvgLinkExternal themeColor={(theme) => theme.colors.text.currentColor} />
							Join our Discord server
						</CtaLink>
						<Button.Ghost hasBorder>Read our blog</Button.Ghost>
					</CtaButtons>
				</CtaSection>
				<BotSection>
					<SubTitle>Our bots</SubTitle>
					<BotsList>
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
						<CustomSolutionUpsell>
							<UpsellTitle>Need a custom solution?</UpsellTitle>
							<span>
								<UpsellLink href="https://www.youtube.com/watch?v=Sk217hyDmHo">Get in touch</UpsellLink> and we{"'"}ll
								help you out
							</span>
						</CustomSolutionUpsell>
					</BotsList>
				</BotSection>
				<DonateHeading>
					<Heading
						title="Support the project"
						subtitle="Support us on Kofi to help maintain these tools and live happily ever after"
						gap={12}
					/>
					<CtaLink href="/kofi">
						<SvgLinkExternal themeColor={(theme) => theme.colors.text.currentColor} />
						Donate
					</CtaLink>
				</DonateHeading>
			</Container>
			<Footer />
		</>
	);
}

export default Home;
