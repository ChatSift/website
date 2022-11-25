import styled from '@emotion/styled';
import { useState } from 'react';
import * as Button from '~/components/Button';
import Footer from '~/components/Footer';
import GuildCard from '~/components/GuildCard';
import Heading from '~/components/Heading';
import PageMeta from '~/components/PageMeta';
import SearchBar from '~/components/SearchBar';
import useLoggedInUser from '~/hooks/useLoggedInUser';
import mediaQueries from '~/styles/breakpoints';
import SvgRefresh from '~/svg/SvgRefresh';
import { dashboardMaxWidth, dashboardPadding, guildCardsPerPage, smallestDashboardWidth } from '~/utils/constants';

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

	& > *:first-of-type {
		margin-bottom: 24px;
	}

	&:not(:first-of-type) {
		margin-top: 32px;
	}
`;

const Container = styled.main`
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	max-width: ${dashboardMaxWidth}px;
	align-items: stretch;
	justify-content: space-between;
	width: fit-content;
	height: 100%;
	margin: 0 auto;
	padding: ${dashboardPadding}px;

	@media (max-width: ${dashboardMaxWidth}px) {
		max-width: ${smallestDashboardWidth - dashboardPadding * 2}px;
	}
`;

const SearchBarModified = styled(SearchBar)`
	margin-bottom: 16px;
`;

const Guilds = styled.ul`
	display: grid;
	grid-template-columns: repeat(${guildCardsPerPage}, 1fr);
	gap: 16px;

	@media (max-width: ${dashboardMaxWidth}px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: ${smallestDashboardWidth}px) {
		grid-template-columns: 1fr;
	}
`;

const numberOfSkeletonGuilds = 16;

function Dashboard() {
	const { data, refetch, isRefetching, isFetching } = useLoggedInUser();
	const [search, setSearch] = useState('');

	const dataToUse = isRefetching ? undefined : data;

	const filtered = dataToUse?.guilds.filter((guild) => guild.name.toLowerCase().includes(search.toLowerCase()));
	const items = filtered?.sort((g1, g2) =>
		Number(g1.hasAma) + Number(g1.hasModmail) + Number(g1.hasAutomoderator) <
		Number(g2.hasAma) + Number(g2.hasModmail) + Number(g2.hasAutomoderator)
			? 1
			: -1,
	);

	return (
		<>
			<PageMeta title="Dashboard" />
			<Container>
				<SectionContainer>
					<MainHeadingContainer>
						<Heading title="Configure bots" subtitle="Pick a server to configure bots in." />
						<Button.Ghost onPress={() => void refetch()} isDisabled={isFetching} data-loading={isFetching} hasBorder>
							<SvgRefresh themeColor={(theme) => theme.colors.text.secondary} />
							Refresh
						</Button.Ghost>
					</MainHeadingContainer>
					<SearchBarModified
						state={[search, setSearch]}
						placeholder="Search for a server"
						aria-label="Search for a server"
					/>
					<Guilds>
						{items?.length
							? items.map((guild) => (
									<li key={guild.id}>
										<GuildCard guild={guild} key={guild.id} />
									</li>
							  ))
							: [...(Array.from({ length: numberOfSkeletonGuilds }) as unknown[])].map((_, index) => (
									<li key={index}>
										<GuildCard guild={undefined} />
									</li>
							  ))}
					</Guilds>
				</SectionContainer>
			</Container>
			<Footer />
		</>
	);
}

export default Dashboard;
