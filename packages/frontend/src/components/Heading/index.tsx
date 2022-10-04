import { HeadingBase, Subtitle, Title } from './HeadingBase';

type HeadingProps = {
	gap?: number;
	subtitle?: string | undefined;
	title: string;
};

function Heading({ title, subtitle, gap }: HeadingProps) {
	return (
		<HeadingBase gap={gap}>
			<Title>{title}</Title>
			{subtitle && <Subtitle>{subtitle}</Subtitle>}
		</HeadingBase>
	);
}

export default Heading;
