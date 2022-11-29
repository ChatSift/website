import { useErrorHandler } from 'react-error-boundary';
import useUser from './useUser';
import useCheckedRouter from '~/hooks/useCheckedRouter';
import { APIError } from '~/utils/fetch';
import * as Urls from '~/utils/urls';

function useLoggedInUser() {
	const user = useUser();
	const { data: loggedInUser, error, isLoading } = user;
	const router = useCheckedRouter();
	const handleError = useErrorHandler();

	if (error !== null && !(error instanceof APIError && error.payload.statusCode === 401)) {
		handleError(error);
		return user;
	}

	if (!isLoading && loggedInUser === undefined) {
		void router.push(Urls.logIn);
		return { ...user, isLoading: true };
	}

	return user;
}

export default useLoggedInUser;
