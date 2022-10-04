import * as Styles from '~/components/Review/style';
import { AuthorAvatar, AuthorInfo } from '~/components/Review/style';

function Review(review: Review) {
	return (
		<Styles.Base>
			<Styles.Quote>{review.content}</Styles.Quote>
			<Styles.Author>
				<AuthorAvatar src={review.author.avatarUrl} />
				<AuthorInfo>
					<Styles.AuthorName>{review.author.name}</Styles.AuthorName>
					<Styles.AuthorRole>{review.author.role}</Styles.AuthorRole>
				</AuthorInfo>
			</Styles.Author>
		</Styles.Base>
	);
}

export default Review;
