import type { SwitchProps } from '@radix-ui/react-switch';
import * as Styles from '~/components/ToggleSwitch/style';

function ToggleSwitch(props: SwitchProps) {
	return (
		<Styles.Root {...props}>
			<Styles.Thumb />
		</Styles.Root>
	);
}

export default ToggleSwitch;
