import type { GetDiscordAuthMeResult } from '@chatsift/website-api/dist/routes/auth/discordAuthMe';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { BotList, GuildCardBase, GuildImage, GuildTitle, NameAndBots, NotInvited } from './style';
import SvgAma from '~/svg/SvgAma';
import SvgAutoModerator from '~/svg/SvgAutoModerator';
import SvgModmail from '~/svg/SvgModmail';

function useRand(min: number, max: number): number {
	const [rand, setRand] = useState(0);

	useEffect(() => {
		setRand(Math.floor(Math.random() * (max - min + 1)) + min);
	}, [min, max]);

	return rand;
}

const SkeletonImage = GuildImage.withComponent(Skeleton);

function GuildCard({ guild }: { guild: GetDiscordAuthMeResult['guilds'][number] | undefined }) {
	const randomBotListCount = useRand(1, 3);
	const icon = guild?.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'assets/gort.jpg';

	const isInvited = guild !== undefined && (guild.hasAutomoderator || guild.hasModmail || guild.hasAma);
	const showInvitedBotsSkeleton = !guild && randomBotListCount > 1.5;

	const skeletonWidth = useRand(40, 100);
	return (
		<GuildCardBase data-is-invited={isInvited || showInvitedBotsSkeleton} data-skeleton={!guild}>
			{guild === undefined ? <SkeletonImage /> : <GuildImage src={icon} />}
			<NameAndBots>
				<GuildTitle>{guild === undefined ? <Skeleton width={`${skeletonWidth}%`} /> : guild.name}</GuildTitle>
				{isInvited || showInvitedBotsSkeleton ? (
					<BotList>
						{guild === undefined ? (
							[...(Array(Math.ceil(randomBotListCount)) as unknown[])].map((_, index) => (
								<Skeleton key={index} width={24} height={24} />
							))
						) : (
							<>
								{guild.hasAutomoderator && (
									<li>
										<SvgAutoModerator />
									</li>
								)}
								{guild.hasAma && (
									<li>
										<SvgAma />
									</li>
								)}
								{guild.hasModmail && (
									<li>
										<SvgModmail />
									</li>
								)}
							</>
						)}
					</BotList>
				) : (
					<NotInvited>{guild === undefined ? <Skeleton width="50%" /> : 'Not invited'}</NotInvited>
				)}
			</NameAndBots>
		</GuildCardBase>
	);
}

export default GuildCard;
