import type { ReactNode } from 'react';
import { Children } from 'react';
import Skeleton from 'react-loading-skeleton';
import * as Styles from '~/components/Config/ConfigOption/style';
import { Text } from '~/components/Text';
import useRand from '~/hooks/useRand';

type ConfigOptionProps = {
	caption: string;
	children?: ReactNode;
	icon?: ReactNode;
	input?: ReactNode;
	isLoading?: boolean;
	name: string;
};

function ConfigOption({ input, icon, name, caption, children, isLoading = false }: ConfigOptionProps) {
	const randCaptionWidth = useRand(40, 200);

	return (
		<Styles.Option>
			<Styles.OptionHeader>
				<Styles.IconAndTag>
					{icon && (isLoading ? <Skeleton width={48} height={48} /> : icon)}
					<Styles.Tag>
						<Text kind="heading4" color="primary" weight="bold">
							{isLoading ? <Skeleton width={`min(20vw, 200px)`} /> : name}
						</Text>
						<Text>{isLoading ? <Skeleton width={`min(10vw, ${randCaptionWidth}px)`} /> : caption}</Text>
					</Styles.Tag>
				</Styles.IconAndTag>
				{input}
			</Styles.OptionHeader>
			{Children.count(children) > 0 && <Styles.Content>{children}</Styles.Content>}
		</Styles.Option>
	);
}

export default ConfigOption;
