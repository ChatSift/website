import Skeleton from 'react-loading-skeleton';
import * as Styles from './style';
import useCheckedRouter from '~/hooks/useCheckedRouter';
import useConfigGuild from '~/hooks/useConfigGuild';
import useRand from '~/hooks/useRand';
import getGuildAcronym from '~/utils/getGuildAcronym';

type ConfigGuildCardProps = {
	wide?: boolean;
};

function ConfigGuildCard({ wide = false }: ConfigGuildCardProps) {
	const router = useCheckedRouter();
	const { guild, isLoading } = useConfigGuild();

	const skeletonWidth = useRand(100, 210);

	if (!guild && !isLoading) {
		void router.push('/dashboard');

		return null;
	}

	const GuildNameComponent = wide ? Styles.GuildNameWide : Styles.GuildName;
	const GuildMemberCountComponent = wide ? Styles.GuildMemberCountWide : Styles.GuildMemberCount;

	return (
		<Styles.Card wide={wide}>
			{isLoading || !guild ? (
				<Styles.SkeletonGuildImage large={wide} />
			) : guild.icon === null ? (
				<Styles.GuildAcronym large={wide} data-first-letter={guild.name[0]} data-full={getGuildAcronym(guild.name)} />
			) : (
				<Styles.GuildImage large={wide} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} />
			)}
			<Styles.CardHeader>
				<GuildNameComponent>{guild?.name ?? <Skeleton width={`min(100%, ${skeletonWidth}px)`} />}</GuildNameComponent>
				<GuildMemberCountComponent>
					{/* TODO: when we fix the types, this ts-expect-error can be removed */}
					{/* @ts-expect-error TS2339 */}
					{guild?.approximate_member_count?.toLocaleString()?.concat(' members') ?? <Skeleton width={100} />}
				</GuildMemberCountComponent>
			</Styles.CardHeader>
		</Styles.Card>
	);
}

export default ConfigGuildCard;
