import { useRouter } from 'next/router';
import * as Urls from '~/utils/urls';

function ModMail() {
	const router = useRouter();

	void router.replace(Urls.dashboard.botPage(router.query.guildId as string, 'modmail', 'settings'));
	return null;
}

export default ModMail;
