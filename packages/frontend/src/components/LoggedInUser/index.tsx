import type { GetDiscordAuthMeResult } from '@chatsift/website-api/dist/routes/auth/discordAuthMe';
import * as Avatar from '@radix-ui/react-avatar';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import Cookies from 'universal-cookie';
import { AvatarImage, AvatarStyleDesktop, AvatarStyleMobile, Discriminator, MobileUser, Username } from './style';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import type { APIError } from '../../utils/fetch';
import * as Urls from '../../utils/urls';
import * as Button from '../Button';

function ErrorHandler({ error }: { error: APIError }) {
	const router = useRouter();

	if (error.payload?.statusCode === 401) {
		return <Button.Ghost onPress={() => void router.replace(Urls.LogIn)}>Log in</Button.Ghost>;
	}

	return <>Error</>;
}

interface UserAvatarProps {
	isLoading: boolean;
	user: GetDiscordAuthMeResult | undefined;
	className: string;
}

function UserAvatar({ isLoading, user, className }: UserAvatarProps) {
	const avatarUrl = user?.avatar
		? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
		: `https://cdn.discordapp.com/embed/avatars/${Number(user?.discriminator) % 5}.png`;

	return (
		<Avatar.Root className={className}>
			{isLoading ? <Skeleton circle className={className} /> : <AvatarImage src={avatarUrl} className={className} />}
		</Avatar.Root>
	);
}

function logOut() {
	const cookies = new Cookies(document.cookie);
	cookies.remove('access_token');
	location.reload();
}

export function Desktop() {
	const { isLoading, data: user, error } = useLoggedInUser();

	if (error) {
		return <ErrorHandler error={error} />;
	}

	return (
		<>
			<Button.Ghost onPress={logOut}>Log out</Button.Ghost>
			<UserAvatar user={user} isLoading={isLoading} className={AvatarStyleDesktop} />
		</>
	);
}

export function Mobile() {
	const { isLoading, data: user, error } = useLoggedInUser();

	if (error) {
		return <ErrorHandler error={error} />;
	}

	return (
		<>
			<MobileUser>
				<UserAvatar user={user} isLoading={isLoading} className={AvatarStyleMobile} />
				<div>
					<Username>{isLoading ? <Skeleton width={100} inline /> : user.username}</Username>
					<Discriminator>#{isLoading ? <Skeleton width={40} inline /> : user.discriminator}</Discriminator>
				</div>
			</MobileUser>
			<Button.Ghost onPress={logOut}>Log out</Button.Ghost>
		</>
	);
}
