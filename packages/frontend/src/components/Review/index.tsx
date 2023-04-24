import * as Styles from '~/components/Review/style';
import { Text } from '~/components/Text';

function Review(review: Review) {
	return (
		<Styles.Base
			height={{
				'@initial': 'large',
				'@small': 'medium',
				'@dashboardMaxWidth': 'small',
			}}
		>
			<Text color="primary">{review.content}</Text>
			<Styles.Author>
				<Styles.AuthorAvatar src={review.author.avatarUrl} />
				<div>
					<Text weight="bold" color="primary">
						{review.author.name}
					</Text>
					<Text>{review.author.role}</Text>
				</div>
			</Styles.Author>
		</Styles.Base>
	);
}

export default Review;
