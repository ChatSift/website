import { useQuery } from '@tanstack/react-query';
import { useErrorHandler } from 'react-error-boundary';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import { fetchApi } from '~/utils/fetch';

function useGuildInfo() {
	const guildId = useConfigGuildId();
	const handleError = useErrorHandler();

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
			onError: (error: Error) => handleError(error),
		},
	);
}

export default useGuildInfo;
