import { useRouter } from 'next/router';
import useLoggedInUser from '~/hooks/useLoggedInUser';

function useConfigGuild() {
	const userInfo = useLoggedInUser();

	// get next url parameters
	const router = useRouter();
	const { guildId } = router.query;

	if (!userInfo.data) {
		return {
			guild: null,
			isLoading: userInfo.isLoading,
			isError: userInfo.isError,
		};
	}

	return {
		guild: userInfo.data?.guilds.find((guild) => guild.id === guildId),
		isLoading: userInfo.isLoading,
		isError: false,
	};
}

export default useConfigGuild;
