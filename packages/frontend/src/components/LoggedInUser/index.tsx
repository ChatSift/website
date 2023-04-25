import type { GetDiscordAuthMeResult } from '@chatsift/website-api';
import * as Avatar from '@radix-ui/react-avatar';
import Skeleton from 'react-loading-skeleton';
import * as Styles from './style';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import useCheckedRouter from '~/hooks/useCheckedRouter';
import useUser from '~/hooks/useUser';
import type { UserFetchError } from '~/hooks/useUser';
import { APIError } from '~/utils/fetch';
import * as Urls from '~/utils/urls';

function ErrorHandler({ error }: { error: UserFetchError }) {
	const router = useCheckedRouter();

	if (error instanceof APIError && error.payload.statusCode === 401) {
		return (
			<Button buttonType="ghost" onPress={() => void router.replace(Urls.logIn)}>
				Log in
			</Button>
		);
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
	const router = useCheckedRouter();

	if (error) {
		return <ErrorHandler error={error} />;
	}

	return (
		<>
			<Button buttonType="ghost" onPress={() => void router.replace(Urls.logOut)}>
				Log out
			</Button>
			<UserAvatar user={user} isLoading={isLoading} className={Styles.AvatarStyleDesktop()} />
		</>
	);
}

type MobileProps = {
	hasDiscriminator?: boolean;
};

export function Mobile({ hasDiscriminator = true }: MobileProps) {
	const { isLoading, data: user, error } = useUser();
	const router = useCheckedRouter();

	if (error) {
		return <ErrorHandler error={error} />;
	}

	return (
		<>
			<Styles.MobileUser>
				<UserAvatar user={user} isLoading={isLoading} className={Styles.AvatarStyleMobile()} />
				<Styles.TextOverflowEllipsis>
					<Text kind="caption" color="primary">
						{isLoading ? <Skeleton width={100} inline /> : user.username}
					</Text>
					{hasDiscriminator && (
						<Text kind="caption" color="disabled">
							#{isLoading ? <Skeleton width={40} inline /> : user.discriminator}
						</Text>
					)}
				</Styles.TextOverflowEllipsis>
			</Styles.MobileUser>
			<Button buttonType="ghost" onPress={() => void router.replace(Urls.logOut)}>
				Log out
			</Button>
		</>
	);
}
