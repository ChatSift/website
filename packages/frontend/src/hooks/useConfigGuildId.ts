import { useRouter } from 'next/router';

function useConfigGuildId() {
	// get next url parameters
	const router = useRouter();
	const { guildId } = router.query;

	return guildId;
}

export default useConfigGuildId;
