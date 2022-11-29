import { useQuery } from '@tanstack/react-query';
import { useErrorHandler } from 'react-error-boundary';
import useDialogController from '~/context/DialogControllerContext';
import useCheckedRouter from '~/hooks/useCheckedRouter';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import { APIError, fetchApi, handleError } from '~/utils/fetch';

function useModmailSettings() {
	const guildId = useConfigGuildId();
	const errorHandler = useErrorHandler();
	const router = useCheckedRouter();
	const dialogController = useDialogController();

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
			retry: (failureCount, error) => {
				return !(error instanceof APIError) && failureCount < 5;
			},
			onError: (error: Error) => handleError(router, error, dialogController, errorHandler),
		},
	);
}

export default useModmailSettings;
