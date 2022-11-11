import * as Select from '@radix-ui/react-select';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import * as Styles from './style';
import { DropdownLabel } from './style';
import SvgDropdownArrow from '~/svg/SvgDropdownArrow';

type DropdownOption<THasIcon extends boolean> = (THasIcon extends true ? { icon: ReactNode } : {}) & {
	label: string;
	value: string;
};

type DropdownProps<THasIcons extends boolean> = {
	hasIcons: THasIcons;
	label?: string;
	options: DropdownOption<THasIcons>[];
	selectedIndex?: number;
	setSelectedIndex(index: number): void;
};

function Dropdown<THasIcons extends boolean>(props: DropdownProps<THasIcons>) {
	const value = useMemo(() => {
		if (props.selectedIndex === undefined) {
			return undefined;
		}

		return props.options[props.selectedIndex];
	}, [props.selectedIndex, props.options]);

	function handleValueChange(value: string) {
		const index = props.options.findIndex((option) => option.value === value);
		props.setSelectedIndex(index);
	}

	const valueWithIcon = value as DropdownOption<true> | undefined;

	console.log(value?.value);

	return (
		<Styles.Container>
			{props.label && <DropdownLabel htmlFor={props.label}>{props.label}</DropdownLabel>}
			<Styles.DropdownMenuContainer>
				<Select.Root value={value?.value} onValueChange={handleValueChange}>
					<Styles.Trigger id={props.label}>
						<Styles.ValueAndIcon>
							{/* {props.hasIcons && valueWithIcon?.icon && <Styles.Icon>{valueWithIcon.icon}</Styles.Icon>} */}
							<Select.Value placeholder="No item selected.">{value?.label}</Select.Value>
						</Styles.ValueAndIcon>
						<SvgDropdownArrow />
					</Styles.Trigger>
					<Styles.Content>
						<Styles.Viewport>
							{props.options.map((option) => (
								<Styles.Item value={option.value} key={option.value}>
									<Select.ItemText>{option.label}</Select.ItemText>
									{/* <Select.ItemIndicator /> */}
								</Styles.Item>
							))}
						</Styles.Viewport>
					</Styles.Content>
				</Select.Root>
			</Styles.DropdownMenuContainer>
		</Styles.Container>
	);
}

export default Dropdown;
