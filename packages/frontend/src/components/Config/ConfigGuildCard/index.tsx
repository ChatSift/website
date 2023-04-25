import Skeleton from 'react-loading-skeleton';
import * as Styles from './style';
import { Text } from '~/components/Text';
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

	return (
		<Styles.Card
			wide={wide}
			padding={{
				'@initial': 'small',
				'@medium': 'large',
			}}
		>
			{isLoading || !guild ? (
				<Styles.GuildImage as={Skeleton} large={wide} />
			) : guild.icon === null ? (
				<Styles.GuildAcronym
					as="div"
					large={wide}
					data-first-letter={guild.name[0]}
					data-full={getGuildAcronym(guild.name)}
				/>
			) : (
				<Styles.GuildImage large={wide} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} />
			)}
			<Styles.CardHeader>
				<Styles.GuildName kind={wide ? 'heading3' : 'body'} weight="bold" color="primary">
					{guild?.name ?? <Skeleton width={`min(100%, ${skeletonWidth}px)`} />}
				</Styles.GuildName>
				<Text kind={wide ? 'body' : 'caption'} color="secondary">
					{/* TODO: when we fix the types, this ts-expect-error can be removed */}
					{/* @ts-expect-error TS2339 */}
					{guild?.approximate_member_count?.toLocaleString()?.concat(' members') ?? <Skeleton width={100} />}
				</Text>
			</Styles.CardHeader>
		</Styles.Card>
	);
}

export default ConfigGuildCard;
