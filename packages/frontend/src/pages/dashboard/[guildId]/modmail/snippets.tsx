import type { Snippet, ModmailRoutes } from '@chatsift/modmail-api';
import type { InferRouteBody } from '@chatsift/rest-utils';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import AlertDialog from '~/components/AlertDialog';
import { Button } from '~/components/Button';
import ConfigPageFrame from '~/components/Config/ConfigPageFrame';
import ModmailSnippet from '~/components/Config/ModmailSnippets/ModmailSnippet';
import SnippetDialog from '~/components/Config/ModmailSnippets/SnippetDialog';
import PageMeta from '~/components/PageMeta';
import { Text } from '~/components/Text';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import useLoggedInUser from '~/hooks/useLoggedInUser';
import useModmailSnippets from '~/hooks/useModmailSnippets';
import { styled, theme } from '~/stitches/stitches.config';
import { snippetNameLength, snippetContentLength } from '~/utils/constants';
import { APIError, fetchApi } from '~/utils/fetch';

const SupportLink = styled('a', {
	color: theme.colors.miscAccent,
	textDecoration: 'underline',
});

const AddButton = styled(Button, {
	position: 'sticky',
	bottom: theme.space.lg,
	alignSelf: 'flex-start',
});

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
				<Text kind="heading3" color="primary" weight="bold">
					ModMail Snippets
				</Text>
				{isLoading || user === undefined || !modmailSnippets ? (
					<Text kind="body" color="secondary" weight="bold">
						Loading...
					</Text>
				) : (
					<>
						{modmailSnippets.map((snippet) => (
							<ModmailSnippet
								key={snippet.snippetId}
								snippet={snippet}
								onDeleteRequested={() => setSnippetToDelete(snippet)}
								onEditRequested={() => {
									setSnippetToEdit(snippet);
									setSnippetEditDraft({
										snippetId: snippet.snippetId,
										updatedById: user!.id,
									});
								}}
							/>
						))}
						{modmailSnippets.length === 0 && (
							<Text kind="body" color="secondary" weight="bold">
								You don't have any snippets yet.
							</Text>
						)}
					</>
				)}
				<AddButton
					buttonType="callToAction"
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
					<Button buttonType="danger" onPress={() => deleteSnippet(snippetToDelete!.snippetId)}>
						Delete
					</Button>
				}
				cancelButton={
					<Button buttonType="ghost" onPress={() => setSnippetToDelete(null)}>
						Cancel
					</Button>
				}
				title="Are you sure you want to delete this?"
			>
				You are about to delete the snippet{' '}
				<Text kind="body" color="primary" weight="bold">
					{snippetToDelete?.name}
				</Text>
				. This action cannot be undone.
			</AlertDialog>
			<AlertDialog
				open={error instanceof APIError}
				actionButton={
					<Button buttonType="callToAction" onPress={() => setError(null)}>
						Okay
					</Button>
				}
				title={`HTTP Error ${error instanceof APIError ? error.payload.statusCode : ''}`}
			>
				We experienced an error; if this persists, please{' '}
				<SupportLink href="/support" target="_blank">
					contact support
				</SupportLink>
				.
			</AlertDialog>
			{showAddSnippetDialog && user !== undefined && snippetAddDraft !== null && (
				<SnippetDialog<SnippetAddBody, SnippetAddBody>
					isLoading={isAddInProgress}
					initialDraft={{
						name: '',
						content: '',
						createdById: user.id,
					}}
					onCancel={() => {
						setShowAddSnippetDialog(false);
						setSnippetAddDraft(null);
					}}
					onSubmit={(draft) => addSnippet(draft)}
					title="Add snippet"
					validityCheck={(draft) =>
						draft.name.length > 0 &&
						draft.content.length > 0 &&
						draft.name.length <= snippetNameLength &&
						draft.content.length <= snippetContentLength
					}
					show
				/>
			)}
			{snippetToEdit && snippetEditDraft && (
				<SnippetDialog
					fallbackValues={snippetToEdit}
					initialDraft={snippetEditDraft}
					isLoading={isEditInProgress}
					onCancel={() => {
						setSnippetToEdit(null);
						setSnippetEditDraft(null);
					}}
					onSubmit={(draft) => editSnippet(draft)}
					title="Edit snippet"
					validityCheck={(draft) =>
						draft !== null &&
						(draft.name?.length ?? 1) > 0 &&
						(draft.name?.length ?? 0) <= snippetNameLength &&
						(draft.content?.length ?? 1) > 0 &&
						(draft.content?.length ?? 0) <= snippetContentLength
					}
					show
				/>
			)}
		</>
	);
}

export default Snippets;
