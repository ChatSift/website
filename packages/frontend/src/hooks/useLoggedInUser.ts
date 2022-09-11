import { useQuery } from '@tanstack/react-query';
import { APIError, fetchApi } from '../utils/fetch';

function useLoggedInUser() {
	return useQuery(
		['currentUser'],
		() =>
			fetchApi({
				path: '/auth/v1/discord/@me',
				method: 'get',
			}),
		{
			refetchOnWindowFocus: false,
			retry: (retries, error: APIError) => {
				console.log(error);

				return retries < 5 && error.payload?.statusCode !== 401;
			},
		},
	);
}

export default useLoggedInUser;
