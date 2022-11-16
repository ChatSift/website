import { useEffect, useMemo, useState } from 'react';
import ConfigGuildCard from '../ConfigGuildCard';
import * as Styles from './style';
import { Links } from './style';
import BackLink from '~/components/Config/ConfigSidebar/components/BackLink';
import Dropdown from '~/components/Dropdown';
import { RouterLink } from '~/components/Link';
import configurableBots from '~/data/bots/config/configurableBots';
import useCheckedRouter from '~/hooks/useCheckedRouter';
import useConfigGuild from '~/hooks/useConfigGuild';
import * as Urls from '~/utils/urls';

const dashboardRoot = '/dashboard/[guildId]';

function ConfigSidebar() {
	const botDropdownOptions = useMemo(
		() =>
			configurableBots.map((bot) => ({
				label: bot.name,
				value: bot.id,
				icon: bot.icon,
			})),
		[],
	);

	const router = useCheckedRouter();
	const [selectedBotId, setSelectedBotId] = useState<string | undefined>(undefined);

	useEffect(() => {
		const currentBot = configurableBots.find((bot) =>
			new RegExp(`^\\/dashboard\\/\\[guildId]\\/${bot.id}.*`).test(router.pathname),
		);

		if (!currentBot) {
			return;
		}

		setSelectedBotId(currentBot.id);
	}, [router.pathname]);

	const { guild, isLoading, isError } = useConfigGuild();

	const cardHref = Urls.dashboard.index(guild?.id ?? 'loading');
	const isOnDashboardRoot = router.pathname === dashboardRoot;

	function changeBot(newSelectedBot: string) {
		if (!guild) {
			return;
		}

		const bot = configurableBots.find(({ id }) => id === newSelectedBot)!;

		if (!bot.sidebarLinks[0]) {
			console.warn('No sidebar links for bot', bot);
			return;
		}

		void router.push(bot.sidebarLinks[0].linkUrlPattern(guild.id));
		setSelectedBotId(newSelectedBot);
	}

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
					<Dropdown
						options={botDropdownOptions}
						hasIcons={true}
						selectedValue={selectedBotId}
						setSelectedValue={changeBot}
						label="Select bot"
					/>
					<Links>
						{configurableBots
							.find(({ id }) => id === selectedBotId)
							?.sidebarLinks.map((link) => {
								const linkHref = link.linkUrlPattern(guild?.id ?? 'loading');
								const active = router.asPath === linkHref;
								const TextComponent = active ? Styles.LinkTextActive : Styles.LinkText;

								return (
									<Styles.SidebarLink
										key={linkHref}
										href={linkHref}
										data-active={active}
										data-loading={guild?.id === undefined}
									>
										<TextComponent>{link.linkText}</TextComponent>
									</Styles.SidebarLink>
								);
							})}
					</Links>
				</>
			)}
		</Styles.ConfigSidebar>
	);
}

export default ConfigSidebar;
