import { useQuery } from '@tanstack/react-query';
import { APIError, fetchApi } from '../utils/fetch';

export type UserFetchError = APIError | Record<string, unknown>;

function useUser() {
	return useQuery(
		['currentUser'],
		async () =>
			fetchApi({
				path: '/auth/v1/discord/@me',
				method: 'get',
			}),
		{
			refetchOnWindowFocus: false,
			retry: (retries, error: UserFetchError) => {
				console.log(error);

				if (!(error instanceof APIError)) {
					return retries < 5;
				}

				return retries < 5 && error.payload.statusCode !== 401;
			},
		},
	);
}

export default useUser;
