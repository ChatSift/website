import type { GetDiscordAuthMeResult } from '@chatsift/website-api';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '~/components/Button';
import DashBotUpsell from '~/components/DashBotUpsell';
import Footer from '~/components/Footer';
import GuildCard from '~/components/GuildCard';
import { guildCardSmallDashWidth } from '~/components/GuildCard/style';
import Heading from '~/components/Heading';
import PageMeta from '~/components/PageMeta';
import SearchBar from '~/components/SearchBar';
import { Text } from '~/components/Text';
import bots from '~/data/bots';
import useLoggedInUser from '~/hooks/useLoggedInUser';
import { styled, theme } from '~/stitches/stitches.config';
import SvgRefresh from '~/svg/SvgRefresh';
import { dashboardMaxWidth, dashboardPadding, guildCardsPerPage, smallestDashboardWidth } from '~/utils/constants';

const MainHeadingContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	gap: theme.space.lg,

	variants: {
		direction: {
			column: {
				flexDirection: 'column',
				alignItems: 'flex-start',
			},
			row: {
				flexDirection: 'row',
				alignItems: 'center',
			},
		},
	},
});

const SectionContainer = styled('div', {
	displayFlex: 'column',

	'& > *:first-of-type': {
		marginBottom: theme.space.xl,
	},

	'&:not(:first-of-type)': {
		marginTop: theme.space.xxl,
	},
});

const Container = styled('main', {
	displayFlex: 'column',
	flex: '1 0 auto',
	alignItems: 'stretch',
	justifyContent: 'space-between',
	width: 'fit-content',
	height: '100%',
	margin: '0 auto',
	padding: dashboardPadding,

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

const SearchBarModified = styled(SearchBar, {
	marginBottom: theme.space.lg,
});

const Guilds = styled('ul', {
	display: 'grid',
	gridTemplateColumns: `repeat(${guildCardsPerPage}, 1fr)`,
	gap: theme.space.lg,
	maxWidth: dashboardMaxWidth - dashboardPadding * 2,

	variants: {
		columns: {
			nGuilds: {
				gridTemplateColumns: `repeat(${guildCardsPerPage}, 1fr)`,
			},
			2: {
				gridTemplateColumns: `1fr 1fr`,
			},
			1: {
				gridTemplateColumns: `1fr`,
			},
		},
	},
});

const NoServersFoundContainer = styled('div', {
	displayFlex: 'column',
	gap: theme.space.xl,

	variants: {
		mobile: {
			true: {
				maxWidth: smallestDashboardWidth - dashboardPadding * 4,
				width: guildCardSmallDashWidth,
			},
			false: {
				maxWidth: 'unset',
				width: `min(${dashboardMaxWidth - dashboardPadding * 2}px, 80vw)`,
			},
		},
	},
});

const NoScript = styled('noscript', {
	displayFlex: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	flex: '1 0 auto',
});

const NoServersHeader = styled('div', {
	displayFlex: 'column',
	gap: theme.space.xxs,
});

const BotUpsells = styled('ul', {
	display: 'flex',
	flexDirection: 'column',
	gap: theme.space.xl,
});

const numberOfSkeletonGuilds = 16;

function saveDataCache(data: Record<string, unknown>[], expiresAt?: Date) {
	localStorage.setItem('dashboardData', JSON.stringify({ data, expiresAt }));
}

function getDataCache() {
	const cache = localStorage.getItem('dashboardData');
	if (!cache) {
		return null;
	}

	const { data, expiresAt } = JSON.parse(cache);
	if (expiresAt && new Date(expiresAt) < new Date()) {
		return null;
	}

	return data;
}

function Dashboard() {
	const { data, refetch, isRefetching, isFetching } = useLoggedInUser();
	const [search, setSearch] = useState('');
	const [dataCache, setDataCache] = useState<GetDiscordAuthMeResult['guilds'] | null>();
	const [isPerformingUserInitiatedRefetch, setIsPerformingUserInitiatedRefetch] = useState(false);

	const dataToUse = isRefetching ? undefined : data;
	const refetchGuilds = useCallback(async () => {
		setIsPerformingUserInitiatedRefetch(true);
		await refetch();
		setIsPerformingUserInitiatedRefetch(false);
	}, [refetch]);

	useEffect(() => {
		setDataCache(getDataCache());
	}, []);

	useEffect(() => {
		if (dataToUse?.guilds !== undefined) {
			saveDataCache(dataToUse.guilds, new Date(Date.now() + 1_000 * 60 * 60 * 5 /* 1h */));
		}
	}, [dataToUse]);

	const filtered = (dataToUse?.guilds ?? dataCache)?.filter((guild) =>
		guild.name.toLowerCase().includes(search.toLowerCase()),
	);
	const guilds = filtered?.sort((g1, g2) =>
		Number(g1.hasAma) + Number(g1.hasModmail) + Number(g1.hasAutomoderator) <
		Number(g2.hasAma) + Number(g2.hasModmail) + Number(g2.hasAutomoderator)
			? 1
			: -1,
	);

	const isNotReady = guilds === undefined || isPerformingUserInitiatedRefetch;

	return (
		<>
			<PageMeta title="Dashboard" />
			<NoScript>
				<style>
					{`
						#container {
							display: none;
						}
					`}
				</style>
				<Text kind="body" color="primary" weight="bold">
					JavaScript is required for this page to work
				</Text>
			</NoScript>
			<Container
				id="container"
				mobile={{
					'@initial': true,
					'@dashboardMaxWidth': false,
				}}
			>
				<SectionContainer>
					<MainHeadingContainer
						direction={{
							'@initial': 'column',
							'@small': 'row',
						}}
					>
						<Heading title="Configure bots" subtitle="Select or add a community to manage." />
						<Button
							buttonType="ghost"
							onPress={() => void refetchGuilds()}
							isDisabled={isFetching}
							data-loading={isFetching}
							ghostHasBorder
						>
							<SvgRefresh themeColor={theme.colors.textSecondary.toString()} />
							Refresh
						</Button>
					</MainHeadingContainer>
					<SearchBarModified
						state={[search, setSearch]}
						placeholder="Search for a server"
						aria-label="Search for a server"
						isDisabled={isNotReady}
					/>
					{isNotReady || (guilds?.length ?? 0) > 0 ? (
						<Guilds
							columns={{
								'@initial': 1,
								'@smallestDashboardWidth': 2,
								'@dashboardMaxWidth': 'nGuilds',
							}}
						>
							{isNotReady
								? [...(Array.from({ length: numberOfSkeletonGuilds }) as unknown[])].map((_, index) => (
										<li key={index}>
											<GuildCard guild={undefined} />
										</li>
								  ))
								: guilds?.map((guild) => (
										<li key={guild.id}>
											<GuildCard guild={guild} key={guild.id} />
										</li>
								  ))}
						</Guilds>
					) : (
						<NoServersFoundContainer
							mobile={{
								'@initial': true,
								'@dashboardMaxWidth': false,
							}}
						>
							<NoServersHeader>
								<Text kind="heading3" color="primary" weight="bold">
									{(dataToUse?.guilds?.length ?? 0) > 0 ? 'No results' : 'No servers found'}
								</Text>
								<Text>Invite a bot by clicking on the respective buttons</Text>
							</NoServersHeader>
							<BotUpsells>
								{Object.keys(bots).map((botId) => (
									<DashBotUpsell key={botId} botId={botId as BotId} />
								))}
							</BotUpsells>
						</NoServersFoundContainer>
					)}
				</SectionContainer>
			</Container>
			<Footer />
		</>
	);
}

export default Dashboard;
