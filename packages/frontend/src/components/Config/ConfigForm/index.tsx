import type { MutationFunction, UseQueryResult } from '@tanstack/react-query';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { ReactNode, ReactPortal } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import * as Styles from './style';
import * as Button from '~/components/Button';
import useRouterLinkController from '~/context/RouterLinkControllerContext';
import useConfigGuildId from '~/hooks/useConfigGuildId';

type ConfigFormProps<TConfig extends Record<string, unknown>, TParams extends Record<string, unknown> = TConfig> = {
	children({
		currentValue,
		setFields,
		isLoading,
	}: {
		currentValue: Partial<TConfig>;
		isLoading: boolean;
		setFields(newValue: Partial<TConfig>): void;
	}): ReactNode;
	handleMutationEnd(): void;
	handleMutationStart(): void;
	mutationFn: MutationFunction<TConfig, Partial<TParams>>;
	settingsApiHook(): UseQueryResult<TConfig | null>;
	transformDataToParams?(data: Partial<TConfig>): Partial<TParams>;
};

function ConfigForm<TConfig extends Record<string, unknown>, TParams extends Record<string, unknown> = TConfig>({
	children,
	handleMutationEnd,
	handleMutationStart,
	mutationFn,
	settingsApiHook,
	transformDataToParams,
}: ConfigFormProps<TConfig, TParams>) {
	const [changes, setChanges] = useState<Partial<TConfig>>({});
	const { data, isLoading } = settingsApiHook();
	const queryClient = useQueryClient();
	const guildId = useConfigGuildId();

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

	const effectiveConfig = { ...data, ...changes } as TConfig;
	const params = useMemo(
		() => transformDataToParams?.(changes) ?? (changes as TParams),
		[changes, transformDataToParams],
	);

	const { mutate, isLoading: mutationIsLoading } = useMutation({
		mutationFn,
		onMutate: () => {
			handleMutationStart();
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['modmailSettings', guildId], data);
			resetConfig();
			handleMutationEnd();
		},
		onError: (error) => {
			// TODO(Johny): Handle error
			console.error(error);
		},
	});

	const [dirtyBarPortal, setDirtyBarPortal] = useState<ReactPortal | null>(null);

	useEffect(() => {
		const domNode = document.querySelector('#dirty-bar');

		if (!domNode) {
			return;
		}

		const portal = createPortal(
			<Styles.DirtyBar data-hidden={!isDirty}>
				<Styles.DirtyBarText>Unsaved changes</Styles.DirtyBarText>
				<Styles.DirtyBarButtons>
					<Button.Ghost paddingOverride={{ x: 12, y: 8 }} onPress={resetConfig} isDisabled={mutationIsLoading}>
						Reset
					</Button.Ghost>
					<Button.Cta paddingOverride={{ x: 12, y: 8 }} onPress={() => mutate(params)} isDisabled={mutationIsLoading}>
						Save
					</Button.Cta>
				</Styles.DirtyBarButtons>
			</Styles.DirtyBar>,
			domNode,
		);

		setDirtyBarPortal(portal);
	}, [isDirty, mutate, mutationIsLoading, params]);

	return (
		<>
			{children({ currentValue: effectiveConfig, setFields, isLoading })}
			{dirtyBarPortal}
		</>
	);
}

export default ConfigForm;
