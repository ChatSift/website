import type { ReactNode } from 'react';
import * as Styles from './style';
import * as Text from '~/components/Text';

type ConfigSectionProps = {
	children: ReactNode;
	description?: string;
	title: string;
};

function ConfigSection({ title, description, children }: ConfigSectionProps) {
	return (
		<Styles.ConfigSection>
			<Styles.SectionHeader>
				<Text.Heading3>{title}</Text.Heading3>
				{description && <Styles.Description>{description}</Styles.Description>}
			</Styles.SectionHeader>
			{children}
		</Styles.ConfigSection>
	);
}

export default ConfigSection;
