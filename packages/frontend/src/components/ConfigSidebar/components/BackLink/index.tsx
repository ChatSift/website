import Link from 'next/link';
import * as Styles from './style';
import SvgArrowLeft from '~/svg/SvgArrowLeft';

function BackLink() {
	return (
		<Styles.BackLink>
			<Link href="/dashboard">
				<Styles.Anchor href="/dashboard">
					<SvgArrowLeft />
					<span>Servers</span>
				</Styles.Anchor>
			</Link>
		</Styles.BackLink>
	);
}

export default BackLink;
