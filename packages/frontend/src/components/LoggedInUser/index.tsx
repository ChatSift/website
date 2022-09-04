import type { GetDiscordAuthMeResult } from '@chatsift/website-api/dist/routes/auth/discordAuthMe';
import * as Avatar from '@radix-ui/react-avatar';
import { AvatarImage, AvatarStyle } from './style';

function LoggedInUser({ user }: { user: GetDiscordAuthMeResult }) {
	const avatarUrl = user.avatar
		? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
		: `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;

	return (
		<Avatar.Root className={AvatarStyle}>
			<AvatarImage src={avatarUrl} className={AvatarStyle} />
		</Avatar.Root>
	);
}

export default LoggedInUser;
