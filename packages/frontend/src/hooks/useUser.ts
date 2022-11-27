import { useQuery } from '@tanstack/react-query';
import { useErrorHandler } from 'react-error-boundary';
import { APIError, fetchApi } from '~/utils/fetch';

export type UserFetchError = APIError | Error;

function useUser() {
	const handleError = useErrorHandler();

	return useQuery(
		['currentUser'],
		async () =>
			fetchApi({
				path: '/auth/v1/discord/@me',
				method: 'get',
			}),
		{
			refetchOnWindowFocus: false,
			onError: (error: UserFetchError) => {
				if (!(error instanceof APIError) || error.payload.statusCode === 401) {
					return;
				}

				handleError(error);
			},
			retry: (retries, error: UserFetchError) => {
				console.log(error);

				if (!(error instanceof APIError)) {
					return retries < 2;
				}

				return retries < 5 && error.payload.statusCode !== 401;
			},
		},
	);
}

export default useUser;
