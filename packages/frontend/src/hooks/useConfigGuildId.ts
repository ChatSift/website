import { useRouter } from 'next/router';

function useConfigGuildId(): string {
	// get next url parameters
	const router = useRouter();
	const { guildId } = router.query;

	return guildId as string;
}

export default useConfigGuildId;
