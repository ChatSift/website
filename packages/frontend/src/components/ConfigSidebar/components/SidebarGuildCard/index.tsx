import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import * as Styles from './style';
import useLoggedInUser from '~/hooks/useLoggedInUser';
import useRand from '~/hooks/useRand';

function SidebarGuildCard() {
	const userInfo = useLoggedInUser();

	// get next url parameters
	const router = useRouter();
	const { guildId } = router.query;

	const guild = userInfo.data?.guilds.find((guild) => guild.id === guildId);

	const skeletonWidth = useRand(40, 100);

	if (!guild && !userInfo.isLoading) {
		// TODO: better handling of this
		void router.push('/dashboard');

		return null;
	}

	console.log(guild);

	return (
		<Styles.Card>
			{guild?.icon ? (
				<Styles.GuildImage src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} />
			) : (
				<Styles.SkeletonGuildImage />
			)}
			<Styles.CardHeader>
				<Styles.GuildName>{guild?.name ?? <Skeleton width={`${skeletonWidth}%`} />}</Styles.GuildName>
			</Styles.CardHeader>
		</Styles.Card>
	);
}

export default SidebarGuildCard;
