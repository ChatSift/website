import { useQuery } from '@tanstack/react-query';
import useThrowError from '~/hooks/useThrowError';
import { APIFetchError, fetchApi } from '~/utils/fetch';

export type UserFetchError = APIFetchError | Error;

function useUser() {
	const throwError = useThrowError();

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
				if (!(error instanceof APIFetchError) || error.payload.statusCode === 401) {
					return;
				}

				throwError(error);
			},
			retry: (retries, error: UserFetchError) => {
				console.log(error);

				if (!(error instanceof APIFetchError)) {
					return retries < 2;
				}

				return retries < 5 && error.payload.statusCode !== 401;
			},
		},
	);
}

export default useUser;
