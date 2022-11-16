import useUser from './useUser';
import useCheckedRouter from '~/hooks/useCheckedRouter';
import * as Urls from '~/utils/urls';

function useLoggedInUser() {
	const user = useUser();
	const { data: loggedInUser, isLoading } = user;
	const router = useCheckedRouter();

	if (!isLoading && loggedInUser === undefined) {
		void router.push(Urls.logIn);
		return { ...user, isLoading: true };
	}

	return user;
}

export default useLoggedInUser;
