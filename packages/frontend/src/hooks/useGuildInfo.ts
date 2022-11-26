import { useQuery } from '@tanstack/react-query';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import useThrowError from '~/hooks/useThrowError';
import { fetchApi } from '~/utils/fetch';

function useGuildInfo() {
	const guildId = useConfigGuildId();
	const throwError = useThrowError();

	return useQuery(
		['getGuild', guildId],
		async () => {
			if (!guildId) {
				return null;
			}

			return fetchApi({
				path: `/auth/v1/discord/@me/guilds/${guildId}`,
				method: 'get',
			});
		},
		{
			enabled: guildId !== undefined,
			refetchOnWindowFocus: false,
			retry: false,
			onError: (error: Error) => throwError(error),
		},
	);
}

export default useGuildInfo;
