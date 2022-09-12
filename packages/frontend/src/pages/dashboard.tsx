import styled from '@emotion/styled';
import { useState } from 'react';
import type { Bot } from '../components/BotCard';
import BotCard from '../components/BotCard';
import * as Button from '../components/Button';
import Footer from '../components/Footer';
import GuildCard from '../components/GuildCard';
import Heading from '../components/Heading';
import Paginator from '../components/Paginator';
import SearchBar from '../components/SearchBar';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { dashboardMaxWidth, dashboardPadding, guildCardsPerPage, smallestDashboardWidth } from '../utils/constants';
import mediaQueries from '~/styles/breakpoints';
import SvgAma from '~/svg/SvgAma';
import SvgAutoModerator from '~/svg/SvgAutoModerator';
import SvgModmail from '~/svg/SvgModmail';
import SvgRefresh from '~/svg/SvgRefresh';

const MainHeadingContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	align-items: flex-start;
	flex-direction: column;

	${mediaQueries.smallMin} {
		flex-direction: row;
		align-items: center;
	}
`;

const SectionContainer = styled.div`
	display: flex;
	flex-direction: column;

	& > *:first-child {
		margin-bottom: 24px;
	}

	&:not(:first-child) {
		margin-top: 32px;
	}
`;

const Container = styled.main`
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	max-width: ${dashboardMaxWidth - dashboardPadding * 2}px;
	align-items: stretch;

	@media (max-width: ${dashboardMaxWidth}px) {
		max-width: ${smallestDashboardWidth - dashboardPadding * 2}px;
	}
`;

const SearchBarModified = styled(SearchBar)`
	margin-bottom: 16px;
`;

const Bots = styled.ul`
	display: grid;
	gap: 16px;
	grid-template-columns: 1fr 1fr 1fr;

	${mediaQueries.dashboardMaxWidthMax} {
		grid-template-columns: 1fr;
	}
`;

const bots: Bot[] = [
	{
		name: 'Automoderator',
		description: 'A powerful solution for your day-to-day moderation bot needs.',
		icon: <SvgAutoModerator />,
	},
	{
		name: 'AMA',
		description: 'Manage and coordinate your Ask-Me-Anything events with ease.',
		icon: <SvgAma />,
	},
	{
		name: 'Modmail',
		description: 'A powerful solution for your day-to-day moderation bot needs.',
		icon: <SvgModmail />,
	},
];

function Dashboard() {
	const { data, refetch, isRefetching, isFetching } = useLoggedInUser();
	const [search, setSearch] = useState('');

	const dataToUse = isRefetching ? undefined : data;

	const filtered = dataToUse?.guilds.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
	const items = filtered?.sort((g1, g2) =>
		Number(g1.hasAma) + Number(g1.hasModmail) + Number(g1.hasAutomoderator) <
		Number(g2.hasAma) + Number(g2.hasModmail) + Number(g2.hasAutomoderator)
			? 1
			: -1,
	);

	return (
		<>
			<Container>
				<SectionContainer>
					<MainHeadingContainer>
						<Heading title="Configure bots" subtitle="Pick a server to configure bots in." />
						<Button.Ghost onPress={() => void refetch()} isDisabled={isFetching} data-loading={isFetching} hasBorder>
							<SvgRefresh />
							Refresh
						</Button.Ghost>
					</MainHeadingContainer>
					<SearchBarModified
						state={[search, setSearch]}
						placeholder="Search for a server"
						aria-label="Search for a server"
					/>
					<Paginator itemsPerPage={guildCardsPerPage} items={items}>
						{(guild) => <GuildCard guild={guild} />}
						{() => <GuildCard guild={undefined} />}
					</Paginator>
				</SectionContainer>
				<SectionContainer>
					<Heading
						title="Server not listed?"
						subtitle="Click the buttons below to add a bot to your server or learn more."
					/>
					<Bots>
						{bots.map((bot) => (
							<li key={bot.name}>
								<BotCard bot={bot} />
							</li>
						))}
					</Bots>
				</SectionContainer>
			</Container>
			<Footer />
		</>
	);
}

export default Dashboard;
