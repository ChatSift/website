import useUser from './useUser';
import useCheckedRouter from '~/hooks/useCheckedRouter';
import useThrowError from '~/hooks/useThrowError';
import { APIFetchError } from '~/utils/fetch';
import * as Urls from '~/utils/urls';

function useLoggedInUser() {
	const user = useUser();
	const { data: loggedInUser, error, isLoading } = user;
	const router = useCheckedRouter();
	const throwError = useThrowError();

	if (error !== null && !(error instanceof APIFetchError && error.payload.statusCode === 401)) {
		throwError(error);
		return user;
	}

	if (!isLoading && loggedInUser === undefined) {
		void router.push(Urls.logIn);
		return { ...user, isLoading: true };
	}

	return user;
}

export default useLoggedInUser;
