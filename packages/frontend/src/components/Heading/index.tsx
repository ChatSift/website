import * as Styles from './style';

type HeadingProps = {
	subtitle?: string | undefined;
	title: string;
};

function Heading({ title, subtitle }: HeadingProps) {
	return (
		<Styles.Heading>
			<Styles.Title>{title}</Styles.Title>
			{subtitle && <Styles.Subtitle>{subtitle}</Styles.Subtitle>}
		</Styles.Heading>
	);
}

export default Heading;
