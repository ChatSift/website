import { useMemo, useState } from 'react';
import ConfigGuildCard from '../ConfigGuildCard';
import * as Styles from './style';
import BackLink from '~/components/Config/ConfigSidebar/components/BackLink';
import Dropdown from '~/components/Dropdown';
import { RouterLink } from '~/components/Link';
import configurableBots from '~/data/bots/config/configurableBots';
import useConfigGuild from '~/hooks/useConfigGuild';

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

	const [selectedBotIndex, setSelectedBotIndex] = useState<number | undefined>(0);

	const { guild, isLoading, isError } = useConfigGuild();

	return (
		<Styles.ConfigSidebar>
			<BackLink />
			<RouterLink href={`/dashboard/${guild?.id}`} style={isLoading || isError ? { pointerEvents: 'none' } : {}}>
				<ConfigGuildCard />
			</RouterLink>
			<Dropdown
				options={botDropdownOptions}
				hasIcons={true}
				selectedIndex={selectedBotIndex}
				setSelectedIndex={setSelectedBotIndex}
				label="Select bot"
			/>
		</Styles.ConfigSidebar>
	);
}

export default ConfigSidebar;
