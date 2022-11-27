import { useQuery } from '@tanstack/react-query';
import { useErrorHandler } from 'react-error-boundary';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import { fetchApi } from '~/utils/fetch';

function useModmailSettings() {
	const guildId = useConfigGuildId();
	const handleError = useErrorHandler();

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
			onError: (error: Error) => handleError(error),
		},
	);
}

export default useModmailSettings;
