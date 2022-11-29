import type { Snippet } from '@chatsift/modmail-api';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import AlertDialog from '~/components/AlertDialog';
import * as Button from '~/components/Button';
import ConfigPageFrame from '~/components/Config/ConfigPageFrame';
import ModmailSnippet from '~/components/Config/ModmailSnippets/ModmailSnippet';
import PageMeta from '~/components/PageMeta';
import * as Text from '~/components/Text';
import useConfigGuildId from '~/hooks/useConfigGuildId';
import useModmailSnippets from '~/hooks/useModmailSnippets';
import { APIError, fetchApi } from '~/utils/fetch';

const SupportLink = styled.a`
	color: ${({ theme }) => theme.colors.accent};
	text-decoration: underline;
`;

function Snippets() {
	const { data: modmailSnippets, isLoading } = useModmailSnippets();
	const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null);
	const guildId = useConfigGuildId();
	const [deleteError, setDeleteError] = useState<Error | null>(null);

	const { mutate: deleteSnippet, isLoading: isDeleteLoading } = useMutation<Snippet, Error, Snippet['snippetId']>({
		mutationFn: async (snippetId) => {
			return fetchApi({
				path: `/modmail/v1/guilds/${guildId}/snippets/${snippetId}`,
				method: 'delete',
			});
		},
		onSuccess: () => {
			setSnippetToDelete(null);
			modmailSnippets?.splice(
				modmailSnippets.findIndex((snippet) => snippet.snippetId === snippetToDelete?.snippetId),
				1,
			);
		},
		onError: (error: Error) => {
			setDeleteError(error);
			setSnippetToDelete(null);
		},
	});

	if (isLoading || !modmailSnippets) {
		return <>Loading</>;
	}

	return (
		<>
			<PageMeta title="ModMail ― Snippets" />
			<ConfigPageFrame>
				<Text.Heading3>ModMail Snippets</Text.Heading3>
				{modmailSnippets.map((snippet) => (
					<ModmailSnippet
						key={snippet.snippetId}
						snippet={snippet}
						onDeleteRequested={() => setSnippetToDelete(snippet)}
						onEditRequested={() => {}}
					/>
				))}
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
				open={deleteError instanceof APIError}
				actionButton={<Button.Cta onPress={() => setDeleteError(null)}>Okay</Button.Cta>}
				title={`HTTP Error ${deleteError instanceof APIError ? deleteError.payload.statusCode : ''}`}
			>
				We couldn't delete that snippet due to an error; if this persists, please{' '}
				<SupportLink href="/support" target="_blank">
					contact support
				</SupportLink>
				.
			</AlertDialog>
		</>
	);
}

export default Snippets;
