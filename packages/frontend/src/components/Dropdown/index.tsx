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

export type DropdownGroupedOptions<THasIcons extends boolean> = {
	id: string;
	label: string;
	options: DropdownOption<THasIcons>[];
};

type DropdownProps<THasIcons extends boolean> = {
	disabled?: boolean;
	hasIcons: THasIcons;
	label?: string;
	options: DropdownGroupedOptions<THasIcons>[] | DropdownOption<THasIcons>[];
	selectedValue?: string;
	setSelectedValue(value: string): void;
};

function Dropdown<THasIcons extends boolean>({ disabled = false, ...props }: DropdownProps<THasIcons>) {
	const isGrouped = 'options' in (props.options[0] ?? {});

	const value = useMemo(() => {
		if (props.selectedValue === undefined) {
			return undefined;
		}

		if (isGrouped) {
			return (props.options as DropdownGroupedOptions<THasIcons>[])
				.flatMap(({ options }) => options)
				.find((option) => option.value === props.selectedValue);
		}

		return (props.options as DropdownOption<THasIcons>[]).find((option) => option.value === props.selectedValue);
	}, [props.selectedValue, props.options, isGrouped]);

	function handleValueChange(value: string) {
		props.setSelectedValue(value);
	}

	// const valueWithIcon = value as DropdownOption<true> | undefined;

	return (
		<Styles.Container disabled={disabled}>
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
							{isGrouped
								? (props.options as DropdownGroupedOptions<THasIcons>[]).map(({ label, id, options }) => (
										<Styles.Group key={`group-${id}`}>
											<Styles.GroupLabel>{label}</Styles.GroupLabel>
											{options.map((option) => (
												<Styles.Item value={option.value} key={option.value}>
													<Select.ItemText>{option.label}</Select.ItemText>
													{/* <Select.ItemIndicator /> */}
												</Styles.Item>
											))}
										</Styles.Group>
								  ))
								: (props.options as DropdownOption<THasIcons>[]).map((option) => (
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
