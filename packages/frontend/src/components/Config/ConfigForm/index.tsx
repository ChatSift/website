import type { MutationFunction, UseQueryResult } from '@tanstack/react-query';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { ReactNode, ReactPortal } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import * as Styles from './style';
import AlertDialog from '~/components/AlertDialog';
import * as Button from '~/components/Button';
import * as Text from '~/components/Text';
import useRouterLinkController from '~/context/RouterLinkControllerContext';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import { APIError } from '~/utils/fetch';

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
	const router = useRouter();
	const [saveError, setSaveError] = useState<APIError | Error | null>(null);
	const [retryInProgress, setRetryInProgress] = useState(false);
	const [dirtyNavigationUrl, setDirtyNavigationUrl] = useState<string | null>(null);

	const isDirty = Object.keys(changes).length > 0;

	const routerLinkController = useRouterLinkController();

	useEffect(() => {
		routerLinkController.setOnNavigate?.((toUrl) => {
			if (isDirty) {
				setDirtyNavigationUrl(toUrl);

				return false;
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
		onError: (error: Error) => {
			setSaveError(error);
			handleMutationEnd();
		},
	});

	function saveConfig() {
		mutate(params);
	}

	function attemptRetry() {
		setRetryInProgress(true);

		// we set a timeout so the user can't spam the button
		setTimeout(() => {
			setRetryInProgress(false);
			setSaveError(null);
			saveConfig();
		}, 1_000);
	}

	const [dirtyBarPortal, setDirtyBarPortal] = useState<ReactPortal | null>(null);

	useEffect(() => {
		const domNode = document.querySelector('#dirty-bar');

		if (!domNode) {
			return;
		}

		const portal = createPortal(
			<Styles.DirtyBar data-hidden={!isDirty}>
				<Text.Body.Regular>Unsaved changes</Text.Body.Regular>
				<Styles.DirtyBarButtons>
					<Button.Ghost paddingOverride={{ x: 12, y: 8 }} onPress={resetConfig} isDisabled={mutationIsLoading}>
						Reset
					</Button.Ghost>
					<Button.Cta paddingOverride={{ x: 12, y: 8 }} onPress={saveConfig} isDisabled={mutationIsLoading}>
						Save
					</Button.Cta>
				</Styles.DirtyBarButtons>
			</Styles.DirtyBar>,
			domNode,
		);

		setDirtyBarPortal(portal);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDirty, mutate, mutationIsLoading, params]);

	return (
		<>
			{children({ currentValue: effectiveConfig, setFields, isLoading })}
			{dirtyBarPortal}
			<AlertDialog
				open={saveError instanceof APIError}
				isLoading={retryInProgress}
				actionButton={
					<Button.Cta isDisabled={retryInProgress} onPress={attemptRetry}>
						Retry
					</Button.Cta>
				}
				cancelButton={
					<Button.Ghost isDisabled={retryInProgress} onPress={() => setSaveError(null)}>
						Cancel
					</Button.Ghost>
				}
				title={`HTTP Error ${saveError instanceof APIError ? saveError.payload.statusCode : ''}`}
			>
				We couldn't save your config due to an error; if this persists, please{' '}
				<Styles.SupportLink href="/support" target="_blank">
					contact support
				</Styles.SupportLink>
				.
			</AlertDialog>
			<AlertDialog
				open={dirtyNavigationUrl !== null}
				actionButton={
					<Button.Cta data-type="danger" onPress={() => void router.push(dirtyNavigationUrl!)}>
						Leave
					</Button.Cta>
				}
				cancelButton={<Button.Ghost onPress={() => setDirtyNavigationUrl(null)}>Cancel</Button.Ghost>}
				title="Unsaved changes"
			>
				You have unsaved changes. Are you sure you want to leave?
			</AlertDialog>
		</>
	);
}

export default ConfigForm;
