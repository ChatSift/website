import { useQuery } from '@tanstack/react-query';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import useThrowError from '~/hooks/useThrowError';
import { fetchApi } from '~/utils/fetch';

function useModmailSettings() {
	const guildId = useConfigGuildId();
	const throwError = useThrowError();

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
			retry: false,
			onError: (error: Error) => throwError(error),
		},
	);
}

export default useModmailSettings;
