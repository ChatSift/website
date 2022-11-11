import { useMemo, useState } from 'react';
import SidebarGuildCard from './components/SidebarGuildCard';
import * as Styles from './style';
import BackLink from '~/components/ConfigSidebar/components/BackLink';
import Dropdown from '~/components/Dropdown';
import configurableBots from '~/data/bots/config/configurableBots';

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

	return (
		<Styles.ConfigSidebar open={false} setOpen={() => {}}>
			<BackLink />
			<SidebarGuildCard />
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
