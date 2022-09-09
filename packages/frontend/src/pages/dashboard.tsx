import GuildCard from '../components/GuildCard';
import Paginator from '../components/Paginator';
import useLoggedInUser from '../hooks/useLoggedInUser';

function Dashboard() {
	const { data } = useLoggedInUser();

	const items = data?.guilds.sort((g1, g2) =>
		Number(g1.hasAma) + Number(g1.hasModmail) + Number(g1.hasAutomoderator) <
		Number(g2.hasAma) + Number(g2.hasModmail) + Number(g2.hasAutomoderator)
			? 1
			: -1,
	);

	return (
		<>
			<Paginator itemsPerPage={4} items={items}>
				{(guild) => <GuildCard guild={guild} />}
				{() => <GuildCard guild={undefined} />}
			</Paginator>
		</>
	);
}

export default Dashboard;
