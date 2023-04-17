import type { GetDiscordAuthMeResult } from '@chatsift/website-api';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import * as Styles from './style';
import { Text } from '~/components/Text';
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

	const Container = isInvited ? ({ children }: ContainerProps) => <Link href={href}>{children}</Link> : Fragment;

	return (
		<Container>
			<Styles.GuildCardBase
				as={isInvited ? 'a' : 'div'}
				isInvited={isInvited || showInvitedBotsSkeleton}
				isSkeleton={!guild}
				href={href}
				mobile={{
					'@initial': true,
					'@smallestDashboardWidth': false,
				}}
			>
				<>
					{guild === undefined ? (
						<Styles.GuildImage as={Skeleton} />
					) : (
						<Styles.CardHeader data-is-invited={isInvited}>
							{icon ? (
								<Styles.GuildImage src={icon} />
							) : (
								<Styles.GuildAcronym
									as={Text}
									kind="caption"
									data-first-letter={guild.name[0]}
									data-full={getGuildAcronym(guild.name)}
								/>
							)}
							<Styles.GuildTitle id="header-title" color="primary" weight="bold">
								{guild.name}
							</Styles.GuildTitle>
						</Styles.CardHeader>
					)}
					<Styles.NameAndBots>
						<Styles.GuildTitle id="not-invited-hover-title" color="primary" weight="bold">
							{guild === undefined ? <Skeleton width={`${skeletonWidth}%`} /> : guild.name}
						</Styles.GuildTitle>
						{isInvited || showInvitedBotsSkeleton ? (
							<Styles.BotList>
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
							</Styles.BotList>
						) : (
							<>
								<Text kind="caption" className="not-invited">
									{guild === undefined ? <Skeleton width="50%" /> : 'Not invited'}
								</Text>
								<Styles.NotInvitedHover>
									<Text kind="caption">Invite a bot:</Text>
									<Styles.BotListNotInvited>
										<li>
											<Styles.Bot href={Urls.botInvite('automoderator')}>
												<SvgAutoModerator width={32} height={32} />
											</Styles.Bot>
										</li>
										<li>
											<Styles.Bot href={Urls.botInvite('ama')}>
												<SvgAma width={32} height={32} />
											</Styles.Bot>
										</li>
										<li>
											<Styles.Bot href={Urls.botInvite('modmail')}>
												<SvgModmail width={32} height={32} />
											</Styles.Bot>
										</li>
									</Styles.BotListNotInvited>
								</Styles.NotInvitedHover>
							</>
						)}
					</Styles.NameAndBots>
				</>
			</Styles.GuildCardBase>
		</Container>
	);
}

export default GuildCard;
