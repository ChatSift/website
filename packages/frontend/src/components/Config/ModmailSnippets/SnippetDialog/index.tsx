import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import * as Styles from './style';
import Button from '~/components/Button';
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
				<Styles.DialogOverlay />
				<Styles.DialogContent data-loading={isLoading}>
					<Styles.DialogTitle>{title}</Styles.DialogTitle>
					<Styles.DialogDescription>
						<Styles.InputLabel htmlFor="name">Snippet command</Styles.InputLabel>
						<Input
							id="name"
							autoComplete="off"
							value={snippetName}
							onChange={(event) => {
								const name = event.target.value.replace(/\s+/g, '-');
								setDraft((currentDraft) => ({ ...currentDraft, name }));
							}}
						/>
						<Styles.CharacterLimit data-exceeded={snippetName.length > snippetNameLength}>
							{snippetName.length} / {snippetNameLength}
						</Styles.CharacterLimit>
						<Styles.InputLabel htmlFor="text">Snippet text</Styles.InputLabel>
						<TextArea
							value={snippetText}
							onChange={(event) => setDraft((currentDraft) => ({ ...currentDraft, content: event.target.value }))}
						/>
						<Styles.CharacterLimit data-exceeded={snippetText.length > snippetContentLength}>
							{snippetText.length} / {snippetContentLength}
						</Styles.CharacterLimit>
					</Styles.DialogDescription>
					<Styles.DialogButtons>
						<Button.Ghost onPress={onCancel}>Cancel</Button.Ghost>
						<Button.Cta onPress={() => onSubmit(draft)} isDisabled={invalid}>
							Save
						</Button.Cta>
					</Styles.DialogButtons>
				</Styles.DialogContent>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default SnippetDialog;
