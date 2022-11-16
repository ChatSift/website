import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import * as Styles from './style';
import useRouterLinkController from '~/RouterLinkControllerContext';
import * as Button from '~/components/Button';

type ConfigBase = Record<string, unknown> | null | undefined;

type ConfigFormProps<TConfig extends ConfigBase> = {
	children({
		currentValue,
		setFields,
		isLoading,
	}: {
		currentValue: Partial<TConfig>;
		isLoading: boolean;
		setFields(newValue: Partial<TConfig>): void;
	}): ReactNode;
	onSaveRequested(): void;
	settingsApiHook(): UseQueryResult<TConfig>;
};
function ConfigForm<TConfig extends ConfigBase>({
	children,
	onSaveRequested,
	settingsApiHook,
}: ConfigFormProps<TConfig>) {
	const [changes, setChanges] = useState<Partial<TConfig>>({});
	const { data, isLoading } = settingsApiHook();

	const isDirty = Object.keys(changes).length > 0;

	const routerLinkController = useRouterLinkController();

	useEffect(() => {
		routerLinkController.setOnNavigate?.(() => {
			if (isDirty) {
				// eslint-disable-next-line no-alert
				return confirm('You have unsaved changes. Are you sure you want to leave this page?');
			}

			return true;
		});

		return () => {
			routerLinkController.setOnNavigate?.(undefined);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDirty]);

	function resetConfig() {
		setChanges({});
	}

	function setFields(newValue: Partial<TConfig>) {
		if (!data || isLoading) {
			console.warn('Cannot set fields when data is not loaded or is loading');
			return;
		}

		setChanges((currentValue) => {
			return Object.fromEntries(
				Object.entries({ ...currentValue, ...newValue })
					.map(([key, value]) => {
						if (data[key] === value || (typeof value === 'string' && value.length === 0 && data[key] === null)) {
							return [key, undefined];
						}

						return [key, value];
					})
					.filter(([, value]) => value !== undefined),
			);
		});
	}

	const effectiveConfig = { ...data, ...changes };

	console.log(effectiveConfig);
	return (
		<>
			{children({ currentValue: effectiveConfig, setFields, isLoading })}
			<Styles.DirtyBar data-hidden={!isDirty}>
				<Styles.DirtyBarText>Unsaved changes</Styles.DirtyBarText>
				<Styles.DirtyBarButtons>
					<Button.Ghost paddingOverride={{ x: 12, y: 8 }} onPress={resetConfig}>
						Reset
					</Button.Ghost>
					<Button.Cta paddingOverride={{ x: 12, y: 8 }} onPress={onSaveRequested}>
						Save
					</Button.Cta>
				</Styles.DirtyBarButtons>
			</Styles.DirtyBar>
		</>
	);
}

export default ConfigForm;
