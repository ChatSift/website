import type { Snippet } from '@chatsift/modmail-api';
import * as Styles from './style';
import { Button } from '~/components/Button';

type ModmailSnippetProps = {
	onDeleteRequested(): void;
	onEditRequested(): void;
	snippet: Snippet;
};

function ModmailSnippet({ snippet, onEditRequested, onDeleteRequested }: ModmailSnippetProps) {
	return (
		<Styles.Snippet>
			<Styles.SnippetHeader>/{snippet.name}</Styles.SnippetHeader>
			<Styles.SnippetBody>{snippet.content}</Styles.SnippetBody>
			<Styles.Buttons>
				<Button buttonType="callToAction" onPress={onEditRequested}>
					Edit
				</Button>
				<Button buttonType="danger" onPress={onDeleteRequested}>
					Delete
				</Button>
			</Styles.Buttons>
		</Styles.Snippet>
	);
}

export default ModmailSnippet;
