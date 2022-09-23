import { HeadingBase, Subtitle, Title } from './HeadingBase';

interface HeadingProps {
	title: string;
	subtitle?: string | undefined;
}

function Heading({ title, subtitle }: HeadingProps) {
	return (
		<HeadingBase>
			<Title>{title}</Title>
			{subtitle && <Subtitle>{subtitle}</Subtitle>}
		</HeadingBase>
	);
}

export default Heading;
