import type { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import * as Styles from '~/components/Config/ConfigOption/style';
import useRand from '~/hooks/useRand';

type ConfigOptionProps = {
	caption: string;
	icon?: ReactNode;
	input: ReactNode;
	isLoading?: boolean;
	name: string;
};

function ConfigOption({ input, icon, name, caption, isLoading = false }: ConfigOptionProps) {
	const randCaptionWidth = useRand(40, 200);

	return (
		<Styles.Option>
			<Styles.OptionHeader>
				<Styles.IconAndTag>
					{icon && (isLoading ? <Skeleton width={48} height={48} /> : icon)}
					<Styles.Tag>
						<Styles.OptionTitle>{isLoading ? <Skeleton width={`min(20vw, 200px)`} /> : name}</Styles.OptionTitle>
						<Styles.OptionCaption>
							{isLoading ? <Skeleton width={`min(10vw, ${randCaptionWidth}px)`} /> : caption}
						</Styles.OptionCaption>
					</Styles.Tag>
				</Styles.IconAndTag>
				{input}
			</Styles.OptionHeader>
		</Styles.Option>
	);
}

export default ConfigOption;
