import * as Dialog from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react';
import * as Styles from './style';
import * as AlertDialogStyles from '~/components/AlertDialog/style';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { TextArea } from '~/components/TextArea';
import { snippetNameLength, snippetContentLength } from '~/utils/constants';

type BasicSnippetInfo = {
	content: string;
	name: string;
};

type SnippetDialogProps<TFallback extends Partial<BasicSnippetInfo>, TDraft extends Partial<BasicSnippetInfo>> = {
	fallbackValues?: TFallback;
	initialDraft: TDraft;
	isLoading: boolean;
	onCancel(): void;
	onSubmit(draft: TDraft): void;
	show: boolean;
	title: string;
	validityCheck(draft: TDraft): boolean;
};

function SnippetDialog<TFallback extends Partial<BasicSnippetInfo>, TDraft extends Partial<BasicSnippetInfo>>({
	fallbackValues,
	initialDraft,
	onCancel,
	isLoading,
	show,
	onSubmit,
	validityCheck,
	title,
}: SnippetDialogProps<TFallback, TDraft>) {
	const [draft, setDraft] = useState<TDraft>(initialDraft);

	// clear the draft when we change the show state
	useEffect(() => setDraft(initialDraft), [initialDraft, show]);

	const snippetText = draft.content ?? fallbackValues?.content ?? '';
	const invalid = !validityCheck(draft);
	const snippetName = draft.name ?? fallbackValues?.name ?? '';
	return (
		<Dialog.Root open={show}>
			<Dialog.Portal>
				<AlertDialogStyles.Overlay as={Dialog.Overlay} />
				<AlertDialogStyles.Content as={Dialog.Content} isLoading={isLoading}>
					<AlertDialogStyles.Title as={Dialog.Title}>{title}</AlertDialogStyles.Title>
					<Styles.DialogDescription>
						<Styles.InputLabel as={Label} kind="caption" htmlFor="name">
							Snippet command
						</Styles.InputLabel>
						<Input
							id="name"
							autoComplete="off"
							value={snippetName}
							onChange={(event) => {
								const name = event.target.value.replace(/\s+/g, '-');
								setDraft((currentDraft) => ({ ...currentDraft, name }));
							}}
						/>
						<Styles.CharacterLimit
							kind="caption"
							weight="thin"
							isLimitExceeded={snippetName.length > snippetNameLength}
						>
							{snippetName.length} / {snippetNameLength}
						</Styles.CharacterLimit>
						<Styles.InputLabel as={Label} kind="caption" htmlFor="text">
							Snippet text
						</Styles.InputLabel>
						<TextArea
							value={snippetText}
							onChange={(event) => setDraft((currentDraft) => ({ ...currentDraft, content: event.target.value }))}
						/>
						<Styles.CharacterLimit
							kind="caption"
							weight="thin"
							isLimitExceeded={snippetText.length > snippetContentLength}
						>
							{snippetText.length} / {snippetContentLength}
						</Styles.CharacterLimit>
					</Styles.DialogDescription>
					<AlertDialogStyles.Buttons>
						<Button buttonType="ghost" onPress={onCancel}>
							Cancel
						</Button>
						<Button buttonType="callToAction" onPress={() => onSubmit(draft)} isDisabled={invalid}>
							Save
						</Button>
					</AlertDialogStyles.Buttons>
				</AlertDialogStyles.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default SnippetDialog;
