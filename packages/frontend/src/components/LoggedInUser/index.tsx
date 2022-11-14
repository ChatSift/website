import type { GetDiscordAuthMeResult } from '@chatsift/website-api/dist/routes/auth/discordAuthMe';
import * as Avatar from '@radix-ui/react-avatar';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import * as Urls from '../../utils/urls';
import * as Button from '../Button';
import * as Styles from './style';
import type { UserFetchError } from '~/hooks/useUser';
import { APIError } from '~/utils/fetch';

function ErrorHandler({ error }: { error: UserFetchError }) {
	const router = useRouter();

	if (error instanceof APIError && error.payload.statusCode === 401) {
		return <Button.Ghost onPress={() => void router.replace(Urls.logIn)}>Log in</Button.Ghost>;
	}

	return <>Error</>;
}

type UserAvatarProps = {
	className: string;
	isLoading: boolean;
	user: GetDiscordAuthMeResult | undefined;
};

function UserAvatar({ isLoading, user, className }: UserAvatarProps) {
	const avatarUrl = user?.avatar
		? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
		: `https://cdn.discordapp.com/embed/avatars/${Number(user?.discriminator) % 5}.png`;

	return (
		<Avatar.Root className={className}>
			{isLoading ? (
				<Skeleton circle className={className} />
			) : (
				<Styles.AvatarImage src={avatarUrl} className={className} />
			)}
		</Avatar.Root>
	);
}

export function Desktop() {
	const { isLoading, data: user, error } = useUser();
	const router = useRouter();

	if (error) {
		return <ErrorHandler error={error} />;
	}

	return (
		<>
			<Button.Ghost onPress={() => void router.replace(Urls.logOut)}>Log out</Button.Ghost>
			<UserAvatar user={user} isLoading={isLoading} className={Styles.AvatarStyleDesktop} />
		</>
	);
}

type MobileProps = {
	hasDiscriminator?: boolean;
};

export function Mobile({ hasDiscriminator = true }: MobileProps) {
	const { isLoading, data: user, error } = useUser();
	const router = useRouter();

	if (error) {
		return <ErrorHandler error={error} />;
	}

	return (
		<>
			<Styles.MobileUser>
				<UserAvatar user={user} isLoading={isLoading} className={Styles.AvatarStyleMobile} />
				<Styles.TextOverflowEllipsis>
					<Styles.Username>{isLoading ? <Skeleton width={100} inline /> : user.username}</Styles.Username>
					{hasDiscriminator && (
						<Styles.Discriminator>
							#{isLoading ? <Skeleton width={40} inline /> : user.discriminator}
						</Styles.Discriminator>
					)}
				</Styles.TextOverflowEllipsis>
			</Styles.MobileUser>
			<Button.Ghost onPress={() => void router.replace(Urls.logOut)}>Log out</Button.Ghost>
		</>
	);
}
