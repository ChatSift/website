import SidebarGuildCard from './components/SidebarGuildCard';
import * as Styles from './style';
import BackLink from '~/components/ConfigSidebar/components/BackLink';

function ConfigSidebar() {
	return (
		<Styles.ConfigSidebar open={false} setOpen={() => {}}>
			<BackLink />
			<SidebarGuildCard />
		</Styles.ConfigSidebar>
	);
}

export default ConfigSidebar;
