import type { GetDiscordAuthMeResult } from '@chatsift/website-api';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
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
import useRand from '~/hooks/useRand';
import SvgAma from '~/svg/SvgAma';
import SvgAutoModerator from '~/svg/SvgAutoModerator';
import SvgModmail from '~/svg/SvgModmail';
import getGuildAcronym from '~/utils/getGuildAcronym';
import * as Urls from '~/utils/urls';

// ??? it is used????
// eslint-disable-next-line react/no-unused-prop-types
type ContainerProps = { children: ReactNode };

function GuildCard({ guild }: { guild: GetDiscordAuthMeResult['guilds'][number] | undefined }) {
	const randomBotListCount = useRand(1, 3);
	const icon = guild?.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null;
	const href = Urls.dashboard.index(String(guild?.id));

	const isInvited = guild !== undefined && (guild.hasAutomoderator || guild.hasModmail || guild.hasAma);
	const showInvitedBotsSkeleton = !guild && randomBotListCount > 1.5;

	const skeletonWidth = useRand(40, 100);

	const BaseComponent = isInvited ? GuildCardBase.withComponent('a') : GuildCardBase.withComponent('div');
	const Container = isInvited ? ({ children }: ContainerProps) => <Link href={href}>{children}</Link> : Fragment;

	return (
		<Container>
			<BaseComponent data-is-invited={isInvited || showInvitedBotsSkeleton} data-skeleton={!guild} href={href}>
				<>
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
											<Bot href={Urls.botInvite('automoderator')}>
												<SvgAutoModerator width={32} height={32} />
											</Bot>
										</li>
										<li>
											<Bot href={Urls.botInvite('ama')}>
												<SvgAma width={32} height={32} />
											</Bot>
										</li>
										<li>
											<Bot href={Urls.botInvite('modmail')}>
												<SvgModmail width={32} height={32} />
											</Bot>
										</li>
									</BotListNotInvited>
								</NotInvitedHover>
							</>
						)}
					</NameAndBots>
				</>
			</BaseComponent>
		</Container>
	);
}

export default GuildCard;
