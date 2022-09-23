import { useRouter } from 'next/router';
import useUser from './useUser';

function useLoggedInUser() {
	const user = useUser();
	const { data: loggedInUser, isLoading } = user;
	const router = useRouter();

	if (!isLoading && loggedInUser === undefined) {
		void router.push('/');
		return { ...user, isLoading: true };
	}

	return user;
}

export default useLoggedInUser;
