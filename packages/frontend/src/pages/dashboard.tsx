import styled from '@emotion/styled';
import * as Button from '../components/Button';
import GuildCard from '../components/GuildCard';
import Heading from '../components/Heading';
import Paginator from '../components/Paginator';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { dashboardMaxWidth, dashboardPadding, guildCardsPerPage, smallestDashboardWidth } from '../utils/constants';
import mediaQueries from '~/styles/breakpoints';
import SvgRefresh from '~/svg/SvgRefresh';

const MainHeadingContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 24px;
	gap: 16px;
	align-items: flex-start;
	flex-direction: column;

	${mediaQueries.smallMin} {
		flex-direction: row;
		align-items: center;
	}
`;

const Container = styled.div`
	max-width: ${dashboardMaxWidth}px;
	padding: ${dashboardPadding}px;

	min-width: min(90vw, ${smallestDashboardWidth}px);
`;

function Dashboard() {
	const { data, refetch, isRefetching, isFetching } = useLoggedInUser();

	const dataToUse = isRefetching ? undefined : data;

	const items = dataToUse?.guilds.sort((g1, g2) =>
		Number(g1.hasAma) + Number(g1.hasModmail) + Number(g1.hasAutomoderator) <
		Number(g2.hasAma) + Number(g2.hasModmail) + Number(g2.hasAutomoderator)
			? 1
			: -1,
	);

	return (
		<Container>
			<MainHeadingContainer>
				<Heading title="Configure bots" subtitle="Pick a server to configure bots in." />
				<Button.Ghost onPress={() => void refetch()} isDisabled={isFetching} data-loading={isFetching} hasBorder>
					<SvgRefresh />
					Refresh
				</Button.Ghost>
			</MainHeadingContainer>
			<Paginator itemsPerPage={guildCardsPerPage} items={items}>
				{(guild) => <GuildCard guild={guild} />}
				{() => <GuildCard guild={undefined} />}
			</Paginator>
		</Container>
	);
}

export default Dashboard;
