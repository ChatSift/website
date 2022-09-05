import type { GetDiscordAuthMeResult } from '@chatsift/website-api/dist/routes/auth/discordAuthMe';
import * as Avatar from '@radix-ui/react-avatar';
import { AvatarImage, AvatarStyleDesktop, AvatarStyleMobile, Discriminator, MobileUser, Username } from './style';

function UserAvatar({ user, className }: { user: GetDiscordAuthMeResult; className: string }) {
	const avatarUrl = user.avatar
		? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
		: `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;

	return (
		<Avatar.Root className={className}>
			<AvatarImage src={avatarUrl} className={className} />
		</Avatar.Root>
	);
}

export function Desktop({ user }: { user: GetDiscordAuthMeResult }) {
	return <UserAvatar user={user} className={AvatarStyleDesktop} />;
}

export function Mobile({ user }: { user: GetDiscordAuthMeResult }) {
	return (
		<MobileUser>
			<UserAvatar user={user} className={AvatarStyleMobile} />
			<div>
				<Username>{user.username}</Username>
				<Discriminator>#{user.discriminator}</Discriminator>
			</div>
		</MobileUser>
	);
}
