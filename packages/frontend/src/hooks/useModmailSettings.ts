import { useQuery } from '@tanstack/react-query';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import type { UserFetchError } from '~/hooks/useUser';
import { APIError, fetchApi } from '~/utils/fetch';

function useModmailSettings() {
	const guildId = useConfigGuildId();

	return useQuery(
		['modmailSettings', guildId],
		async () => {
			if (!guildId) {
				return null;
			}

			return fetchApi({
				path: `/modmail/v1/guilds/${guildId}/settings/`,
				method: 'get',
			});
		},
		{
			enabled: guildId !== undefined,
			refetchOnWindowFocus: false,
			retry: (retries, error: UserFetchError) => {
				console.log(error);

				if (!(error instanceof APIError)) {
					return retries < 5;
				}

				return retries <= 2 && error.payload.statusCode !== 401;
			},
		},
	);
}

export default useModmailSettings;
