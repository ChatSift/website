import { HeadingBase, Subtitle, Title } from './HeadingBase';

interface HeadingProps {
	title: string;
	subtitle?: string | undefined;
	gap?: number;
}

function Heading({ title, subtitle, gap }: HeadingProps) {
	return (
		<HeadingBase gap={gap}>
			<Title>{title}</Title>
			{subtitle && <Subtitle>{subtitle}</Subtitle>}
		</HeadingBase>
	);
}

export default Heading;
