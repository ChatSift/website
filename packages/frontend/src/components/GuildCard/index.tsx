import type { GetDiscordAuthMeResult } from '@chatsift/website-api/dist/routes/auth/discordAuthMe';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
	Bot,
	BotList,
	BotListNotInvited,
	CardHeader,
	GuildAcronym,
	GuildCardBase,
	GuildImage,
	GuildTitle,
	NameAndBots,
	NotInvited,
	NotInvitedHover,
	SkeletonImage,
} from './style';
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

function getGuildAcronym(guildName: string) {
	return guildName
		.split(' ')
		.map(([firstLetter]) => firstLetter)
		.join('');
}

function GuildCard({ guild }: { guild: GetDiscordAuthMeResult['guilds'][number] | undefined }) {
	const randomBotListCount = useRand(1, 3);
	const icon = guild?.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null;

	const isInvited = guild !== undefined && (guild.hasAutomoderator || guild.hasModmail || guild.hasAma);
	const showInvitedBotsSkeleton = !guild && randomBotListCount > 1.5;

	const skeletonWidth = useRand(40, 100);

	const BaseComponent = isInvited ? GuildCardBase.withComponent('a') : GuildCardBase.withComponent('div');

	return (
		<BaseComponent data-is-invited={isInvited || showInvitedBotsSkeleton} data-skeleton={!guild}>
			{guild === undefined ? (
				<SkeletonImage />
			) : (
				<CardHeader data-is-invited={isInvited}>
					{icon ? (
						<GuildImage src={icon} />
					) : (
						<GuildAcronym data-first-letter={guild.name[0]} data-full={getGuildAcronym(guild.name)} />
					)}
					<GuildTitle id="header-title">{guild.name}</GuildTitle>
				</CardHeader>
			)}
			<NameAndBots>
				<GuildTitle id="not-invited-hover-title">
					{guild === undefined ? <Skeleton width={`${skeletonWidth}%`} /> : guild.name}
				</GuildTitle>
				{isInvited || showInvitedBotsSkeleton ? (
					<BotList>
						{guild === undefined ? (
							[...(Array.from({ length: Math.ceil(randomBotListCount) }) as unknown[])].map((_, index) => (
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
					<>
						<NotInvited>{guild === undefined ? <Skeleton width="50%" /> : 'Not invited'}</NotInvited>
						<NotInvitedHover>
							<span>Invite a bot:</span>
							<BotListNotInvited>
								<li>
									<Bot href="/inv-auto-moderator">
										<SvgAutoModerator width={32} height={32} />
									</Bot>
								</li>
								<li>
									<Bot href="/inv-ama">
										<SvgAma width={32} height={32} />
									</Bot>
								</li>
								<li>
									<Bot href="/inv-modmail">
										<SvgModmail width={32} height={32} />
									</Bot>
								</li>
							</BotListNotInvited>
						</NotInvitedHover>
					</>
				)}
			</NameAndBots>
		</BaseComponent>
	);
}

export default GuildCard;
