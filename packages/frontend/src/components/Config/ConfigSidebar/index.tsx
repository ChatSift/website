import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import ConfigGuildCard from '../ConfigGuildCard';
import * as Styles from './style';
import { Links } from './style';
import BackLink from '~/components/Config/ConfigSidebar/components/BackLink';
import Dropdown from '~/components/Dropdown';
import { RouterLink } from '~/components/Link';
import configurableBots from '~/data/bots/config/configurableBots';
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

	const router = useRouter();
	const [selectedBotIndex, setSelectedBotIndex] = useState<number | undefined>(0);

	useEffect(() => {
		const currentBot = configurableBots.find((bot) => router.pathname === `${dashboardRoot}/${bot.id}`);
		if (!currentBot) {
			return;
		}

		const index = configurableBots.findIndex((bot) => bot.id === currentBot.id);
		setSelectedBotIndex(index);
	}, [router.pathname]);

	const { guild, isLoading, isError } = useConfigGuild();
	console.log(router);

	const cardHref = Urls.dashboard.index(guild?.id ?? 'loading');
	const isOnDashboardRoot = router.pathname === dashboardRoot;

	function changeBot(index: number) {
		if (!guild) {
			return;
		}

		const bot = configurableBots[index ?? 0];

		void router.push(Urls.dashboard.bot(guild.id, bot!.id));
		setSelectedBotIndex(index);
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
						selectedIndex={selectedBotIndex}
						setSelectedIndex={changeBot}
						label="Select bot"
					/>
					<Links>
						{configurableBots[selectedBotIndex ?? 0]!.sidebarLinks.map((link) => {
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
