import * as Select from '@radix-ui/react-select';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import * as Styles from './style';
import { Text } from '~/components/Text';
import { theme } from '~/stitches/stitches.config';
import SvgDropdownArrow from '~/svg/SvgDropdownArrow';
import SvgTrashBin from '~/svg/SvgTrashBin';

const noneOption = {
	label: 'None',
	value: 'none',
	icon: <SvgTrashBin className={Styles.itemIcon()} themeColor={theme.colors.textPrimary.toString()} />,
};

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
	hasNoneOption?: boolean;
	label?: string;
	options: DropdownGroupedOptions<THasIcons>[] | DropdownOption<THasIcons>[];
	selectedValue?: string | null;
	setSelectedValue(value: string | null): void;
};

function Dropdown<THasIcons extends boolean>({
	disabled = false,
	hasNoneOption = false,
	...props
}: DropdownProps<THasIcons>) {
	const isGrouped = 'options' in (props.options[0] ?? {});

	const value = useMemo(() => {
		if (props.selectedValue === null || props.selectedValue === undefined) {
			return noneOption;
		}

		if (isGrouped) {
			return (props.options as DropdownGroupedOptions<THasIcons>[])
				.flatMap(({ options }) => options)
				.find((option) => option.value === props.selectedValue);
		}

		return (props.options as DropdownOption<THasIcons>[]).find((option) => option.value === props.selectedValue);
	}, [props.selectedValue, props.options, isGrouped]);

	function handleValueChange(value: string) {
		if (value === noneOption.value) {
			props.setSelectedValue(null);
			return;
		}

		props.setSelectedValue(value);
	}

	// const valueWithIcon = value as DropdownOption<true> | undefined;

	return (
		<Styles.Container isDisabled={disabled}>
			{props.label && (
				<Text as="label" kind="caption" htmlFor={props.label}>
					{props.label}
				</Text>
			)}
			<Styles.DropdownMenuContainer>
				<Select.Root value={value?.value} onValueChange={handleValueChange}>
					<Styles.Trigger id={props.label}>
						<Styles.ValueAndIcon color="primary">
							{(props.hasIcons || value?.value === noneOption.value) &&
								(value as DropdownOption<true> | undefined)?.icon}
							<Select.Value placeholder="No item selected.">{value?.label}</Select.Value>
						</Styles.ValueAndIcon>
						<Styles.DropdownArrowIcon>
							<SvgDropdownArrow themeColor={theme.colors.textDisabled.toString()} />
						</Styles.DropdownArrowIcon>
					</Styles.Trigger>
					<Styles.Content>
						<Styles.Viewport>
							{hasNoneOption && (
								<Styles.Item value={noneOption.value}>
									<SvgTrashBin className={Styles.itemIcon()} themeColor={theme.colors.textPrimary.toString()} />{' '}
									<Select.ItemText>{noneOption.label}</Select.ItemText>
								</Styles.Item>
							)}

							{isGrouped
								? (props.options as DropdownGroupedOptions<THasIcons>[]).map(({ label, id, options }) => (
										<Styles.Group key={`group-${id}`}>
											<Styles.GroupLabel>{label}</Styles.GroupLabel>
											{options.map((option) => (
												<Styles.Item value={option.value} key={option.value}>
													{props.hasIcons && (option as DropdownOption<true>).icon}
													<Select.ItemText>{option.label}</Select.ItemText>
													{/* <Select.ItemIndicator /> */}
												</Styles.Item>
											))}
										</Styles.Group>
								  ))
								: (props.options as DropdownOption<THasIcons>[]).map((option) => (
										<Styles.Item value={option.value} key={option.value}>
											{props.hasIcons && (option as DropdownOption<true>).icon}
											<Select.ItemText>{option.label}</Select.ItemText>
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
