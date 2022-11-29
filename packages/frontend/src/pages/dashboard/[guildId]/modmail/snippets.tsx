import type { Snippet, ModmailRoutes } from '@chatsift/modmail-api';
import type { InferRouteBody } from '@chatsift/rest-utils';
import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import AlertDialog from '~/components/AlertDialog';
import * as AlertDialogStyles from '~/components/AlertDialog/style';
import * as Button from '~/components/Button';
import ConfigPageFrame from '~/components/Config/ConfigPageFrame';
import ModmailSnippet from '~/components/Config/ModmailSnippets/ModmailSnippet';
import { Input } from '~/components/Input';
import PageMeta from '~/components/PageMeta';
import * as Text from '~/components/Text';
import { TextArea } from '~/components/TextArea';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import useLoggedInUser from '~/hooks/useLoggedInUser';
import useModmailSnippets from '~/hooks/useModmailSnippets';
import { APIError, fetchApi } from '~/utils/fetch';

const SupportLink = styled.a`
	color: ${({ theme }) => theme.colors.accent};
	text-decoration: underline;
`;

const StatusText = styled(Text.Body.Bold)`
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const InputLabel = styled(Label)`
	font-size: 16px;
	font-weight: 550;
	color: ${({ theme }) => theme.colors.text.secondary};
	margin-bottom: 8px;

	&:not(:first-of-type) {
		margin-top: 16px;
	}
`;

const DialogOverlay = AlertDialogStyles.Overlay.withComponent(Dialog.Overlay);
const DialogContent = AlertDialogStyles.Content.withComponent(Dialog.Content);
const DialogTitle = AlertDialogStyles.Title.withComponent(Dialog.Title);
const DialogDescription = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.background.card};
	color: ${({ theme }) => theme.colors.text.primary};
	padding: 16px;
	font-size: 18px;
`;

const DialogButtons = styled.div`
	display: flex;
	justify-content: flex-end;
	border-top: 1px solid ${({ theme }) => theme.colors.onBackground.secondary};
	padding: 12px 16px;
	gap: 8px;
`;

const AddButton = styled(Button.Cta)`
	position: sticky;
	bottom: 16px;
	align-self: flex-start;
`;

type SnippetAddBody = InferRouteBody<ModmailRoutes[`/modmail/v1/guilds/${string}/snippets/`]['put']>;
type SnippetEditBody = InferRouteBody<ModmailRoutes[`/modmail/v1/guilds/${string}/snippets/${string}`]['patch']> &
	Pick<Snippet, 'snippetId'>;

function Snippets() {
	const { data: modmailSnippets, isLoading } = useModmailSnippets();
	const { data: user } = useLoggedInUser();
	const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null);
	const [showAddSnippetDialog, setShowAddSnippetDialog] = useState<boolean>(false);
	const [snippetToEdit, setSnippetToEdit] = useState<Snippet | null>(null);
	const [snippetEditDraft, setSnippetEditDraft] = useState<SnippetEditBody | null>(null);
	const [snippetAddDraft, setSnippetAddDraft] = useState<SnippetAddBody | null>(null);
	const guildId = useConfigGuildId();
	const [error, setError] = useState<Error | null>(null);

	const { mutate: addSnippet, isLoading: isAddInProgress } = useMutation<Snippet, Error, SnippetAddBody>({
		mutationFn: async (variables) => {
			return fetchApi({
				path: `/modmail/v1/guilds/${guildId}/snippets/`,
				method: 'put',
				body: variables,
			});
		},
		onSuccess: (snippet) => {
			modmailSnippets?.push(snippet);
			setSnippetAddDraft(null);
		},
		onError: (error: Error) => {
			setError(error);
			setSnippetAddDraft(null);
		},
	});

	const { mutate: editSnippet, isLoading: isEditInProgress } = useMutation<Snippet, Error, SnippetEditBody>({
		mutationFn: async ({ snippetId, ...snippet }) => {
			return fetchApi({
				path: `/modmail/v1/guilds/${guildId}/snippets/${snippetId}`,
				method: 'patch',
				body: snippet,
			});
		},
		onSuccess: (newSnippet) => {
			const snippetIdx = modmailSnippets!.findIndex((snippet) => snippet.snippetId === newSnippet.snippetId);
			modmailSnippets![snippetIdx] = newSnippet;
			setSnippetToEdit(null);
		},
		onError: (error: Error) => {
			setError(error);
			setSnippetToEdit(null);
		},
	});

	const { mutate: deleteSnippet, isLoading: isDeleteLoading } = useMutation<Snippet, Error, Snippet['snippetId']>({
		mutationFn: async (snippetId) => {
			return fetchApi({
				path: `/modmail/v1/guilds/${guildId}/snippets/${snippetId}`,
				method: 'delete',
			});
		},
		onSuccess: () => {
			modmailSnippets?.splice(
				modmailSnippets.findIndex((snippet) => snippet.snippetId === snippetToDelete?.snippetId),
				1,
			);
			setSnippetToDelete(null);
		},
		onError: (error: Error) => {
			setError(error);
			setSnippetToDelete(null);
		},
	});

	return (
		<>
			<PageMeta title="ModMail ― Snippets" />
			<ConfigPageFrame>
				<Text.Heading3>ModMail Snippets</Text.Heading3>
				{isLoading || !modmailSnippets ? (
					<StatusText>Loading...</StatusText>
				) : (
					<>
						{modmailSnippets.map((snippet) => (
							<ModmailSnippet
								key={snippet.snippetId}
								snippet={snippet}
								onDeleteRequested={() => setSnippetToDelete(snippet)}
								onEditRequested={() => {
									setSnippetToEdit(snippet);
									setSnippetEditDraft({ snippetId: snippet.snippetId, updatedById: user!.id });
								}}
							/>
						))}
						{modmailSnippets.length === 0 && <StatusText>You don't have any snippets yet.</StatusText>}
					</>
				)}
				<AddButton
					isDisabled={user === null || user === undefined}
					onPress={() => {
						setShowAddSnippetDialog(true);
						setSnippetAddDraft({
							name: '',
							content: '',
							createdById: user?.id ?? '',
						});
					}}
				>
					Add snippet
				</AddButton>
			</ConfigPageFrame>
			<AlertDialog
				open={snippetToDelete !== null}
				isLoading={isDeleteLoading}
				actionButton={
					<Button.Cta data-type="danger" onPress={() => deleteSnippet(snippetToDelete!.snippetId)}>
						Delete
					</Button.Cta>
				}
				cancelButton={<Button.Ghost onPress={() => setSnippetToDelete(null)}>Cancel</Button.Ghost>}
				title="Are you sure you want to delete this?"
			>
				You are about to delete the snippet <Text.Body.Bold>{snippetToDelete?.name}</Text.Body.Bold>. This action cannot
				be undone.
			</AlertDialog>
			<AlertDialog
				open={error instanceof APIError}
				actionButton={<Button.Cta onPress={() => setError(null)}>Okay</Button.Cta>}
				title={`HTTP Error ${error instanceof APIError ? error.payload.statusCode : ''}`}
			>
				We experienced an error; if this persists, please{' '}
				<SupportLink href="/support" target="_blank">
					contact support
				</SupportLink>
				.
			</AlertDialog>
			<Dialog.Root open={showAddSnippetDialog !== null}>
				{showAddSnippetDialog && snippetAddDraft !== null && (
					<Dialog.Portal>
						<DialogOverlay />
						<DialogContent data-loading={isAddInProgress}>
							<DialogTitle>Add snippet</DialogTitle>
							<DialogDescription>
								<InputLabel htmlFor="name">Snippet command</InputLabel>
								<Input
									id="name"
									autoComplete="off"
									value={snippetAddDraft?.name ?? ''}
									data-invalid={snippetAddDraft?.name.length === 0 || snippetAddDraft?.name.length > 32}
									onChange={(event) => {
										const name = event.target.value.replace(/\s+/g, '-');
										setSnippetAddDraft((currentDraft) => ({ ...currentDraft!, name }));
									}}
								/>
								<InputLabel htmlFor="text">Snippet text</InputLabel>
								<TextArea
									value={snippetAddDraft?.content ?? ''}
									onChange={(event) =>
										setSnippetAddDraft((currentDraft) => ({ ...currentDraft!, content: event.target.value }))
									}
								/>
							</DialogDescription>
							<DialogButtons>
								<Button.Ghost
									onPress={() => {
										setShowAddSnippetDialog(false);
										setSnippetAddDraft(null);
									}}
								>
									Cancel
								</Button.Ghost>
								<Button.Cta onPress={() => addSnippet(snippetAddDraft)}>Save</Button.Cta>
							</DialogButtons>
						</DialogContent>
					</Dialog.Portal>
				)}
			</Dialog.Root>
			<Dialog.Root open={snippetToEdit !== null && snippetEditDraft !== null}>
				{snippetToEdit !== null && snippetEditDraft !== null && (
					<Dialog.Portal>
						<DialogOverlay />
						<DialogContent data-loading={isEditInProgress}>
							<DialogTitle>Edit snippet</DialogTitle>
							<DialogDescription>
								<InputLabel htmlFor="name">Snippet command</InputLabel>
								<Input
									id="name"
									autoComplete="off"
									value={snippetEditDraft?.name ?? snippetToEdit.name}
									data-invalid={
										snippetEditDraft?.name !== undefined &&
										(snippetEditDraft?.name.length === 0 || snippetEditDraft?.name.length > 32)
									}
									onChange={(event) => {
										const name = event.target.value.replace(/\s+/g, '-');
										setSnippetEditDraft((currentDraft) => ({ ...currentDraft!, name }));
									}}
								/>
								<InputLabel htmlFor="text">Snippet text</InputLabel>
								<TextArea
									value={snippetEditDraft?.content ?? snippetToEdit.content}
									onChange={(event) =>
										setSnippetEditDraft((currentDraft) => ({ ...currentDraft!, content: event.target.value }))
									}
								/>
							</DialogDescription>
							<DialogButtons>
								<Button.Ghost
									onPress={() => {
										setSnippetToEdit(null);
										setSnippetEditDraft(null);
									}}
								>
									Cancel
								</Button.Ghost>
								<Button.Cta
									isDisabled={
										(snippetEditDraft.content ?? snippetToEdit.content) === snippetToEdit.content &&
										(snippetEditDraft.name ?? snippetToEdit.name) === snippetToEdit.name
									}
									onPress={() => editSnippet(snippetEditDraft)}
								>
									Save
								</Button.Cta>
							</DialogButtons>
						</DialogContent>
					</Dialog.Portal>
				)}
			</Dialog.Root>
		</>
	);
}

export default Snippets;
