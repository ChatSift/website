import type { Snippet } from '@chatsift/modmail-api';
import * as Styles from './style';
import * as Button from '~/components/Button';

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
				<Button.Cta onPress={onEditRequested}>Edit</Button.Cta>
				<Button.Cta onPress={onDeleteRequested} data-type="danger">
					Delete
				</Button.Cta>
			</Styles.Buttons>
		</Styles.Snippet>
	);
}

export default ModmailSnippet;
