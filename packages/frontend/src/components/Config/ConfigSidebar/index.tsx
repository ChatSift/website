import { useEffect, useMemo, useState } from 'react';
import ConfigGuildCard from '../ConfigGuildCard';
import * as Styles from './style';
import BackLink from '~/components/Config/ConfigSidebar/components/BackLink';
import { RouterLink } from '~/components/Link';
import { Text } from '~/components/Text';
import configurableBots from '~/data/bots/config/configurableBots';
import useCheckedRouter from '~/hooks/useCheckedRouter';
import useConfigGuild from '~/hooks/useConfigGuild';
import * as Urls from '~/utils/urls';

const dashboardRoot = '/dashboard/[guildId]';

function ConfigSidebar() {
	// const botDropdownOptions = useMemo(
	// 	() =>
	// 		configurableBots.map((bot) => ({
	// 			label: bot.name,
	// 			value: bot.id,
	// 			icon: bot.icon,
	// 		})),
	// 	[],
	// );

	const router = useCheckedRouter();
	const [selectedBotId, setSelectedBotId] = useState<string | undefined>(undefined);
	const currentBot = useMemo(
		() => configurableBots.find((bot) => router.pathname.split('/')[3] === bot.id),
		[router.pathname],
	);

	useEffect(() => {
		if (!currentBot) {
			return;
		}

		setSelectedBotId(currentBot.id);
	}, [currentBot]);

	const { guild, isLoading, isError } = useConfigGuild();

	const cardHref = Urls.dashboard.index(guild?.id ?? 'loading');
	const isOnDashboardRoot = router.pathname === dashboardRoot;

	// function changeBot(newSelectedBot: string) {
	// 	if (!guild) {
	// 		return;
	// 	}
	//
	// 	const bot = configurableBots.find(({ id }) => id === newSelectedBot)!;
	//
	// 	if (!bot.sidebarLinks[0]) {
	// 		console.warn('No sidebar links for bot', bot);
	// 		return;
	// 	}
	//
	// 	void router.push(bot.sidebarLinks[0].linkUrlPattern(guild.id));
	// 	setSelectedBotId(newSelectedBot);
	// }

	return (
		<Styles.ConfigSidebar>
			<BackLink href={isOnDashboardRoot ? '/dashboard' : cardHref}>
				{isOnDashboardRoot ? 'Servers' : 'Back to Server Settings'}
			</BackLink>
			<RouterLink href={cardHref} style={isLoading || isError ? { pointerEvents: 'none' } : {}}>
				<ConfigGuildCard />
			</RouterLink>
			{!isOnDashboardRoot && (
				<>
					{/* <Dropdown */}
					{/* 	options={botDropdownOptions} */}
					{/* 	hasIcons={true} */}
					{/* 	selectedValue={selectedBotId} */}
					{/* 	setSelectedValue={changeBot} */}
					{/* 	label="Select bot" */}
					{/* /> */}
					<Styles.Links>
						{configurableBots
							.find(({ id }) => id === selectedBotId)
							?.sidebarLinks.map((link) => {
								const linkHref = link.linkUrlPattern(guild?.id ?? 'loading');
								const active = router.asPath === linkHref;

								return (
									<Styles.SidebarLink
										key={linkHref}
										href={linkHref}
										data-active={active}
										data-loading={guild?.id === undefined}
									>
										<Text kind="body" color={active ? 'primary' : 'secondary'} weight={active ? 'bold' : 'thin'}>
											{link.linkText}
										</Text>
									</Styles.SidebarLink>
								);
							})}
					</Styles.Links>
				</>
			)}
		</Styles.ConfigSidebar>
	);
}

export default ConfigSidebar;
