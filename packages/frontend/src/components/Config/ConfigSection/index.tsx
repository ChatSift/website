import type { ReactNode } from 'react';
import * as Styles from './style';
import { Text } from '~/components/Text';

type ConfigSectionProps = {
	children: ReactNode;
	description?: string;
	title: string;
};

function ConfigSection({ title, description, children }: ConfigSectionProps) {
	return (
		<Styles.ConfigSection>
			<Styles.SectionHeader>
				<Text kind="heading3" color="primary" weight="bold">
					{title}
				</Text>
				{description && (
					<Text kind="body" weight="thin" color="secondary">
						{description}
					</Text>
				)}
			</Styles.SectionHeader>
			{children}
		</Styles.ConfigSection>
	);
}

export default ConfigSection;
