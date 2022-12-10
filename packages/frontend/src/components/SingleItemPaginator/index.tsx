import type { ReactNode } from 'react';
import { Children, useState } from 'react';
import Button from '~/components/Button';
import * as Styles from '~/components/SingleItemPaginator/style';
import { buttonPadding, Controls, CurrentPage } from '~/components/SingleItemPaginator/style';
import SvgNext from '~/svg/SvgNext';
import SvgPrev from '~/svg/SvgPrev';

type SingleItemPaginatorProps = {
	children: [ReactNode, ReactNode, ...ReactNode[]];
};

function SingleItemPaginator(props: SingleItemPaginatorProps) {
	const maxPage = Children.count(props.children) - 1;
	const [page, setPage] = useState(0);

	function prev() {
		if (page > 0) {
			setPage(page - 1);
			return;
		}

		setPage(maxPage);
	}

	function next() {
		if (page === maxPage) {
			setPage(0);
			return;
		}

		setPage(page + 1);
	}

	return (
		<Styles.Base>
			<Styles.Content>{Children.toArray(props.children)[page]}</Styles.Content>
			<Controls>
				<Button.Ghost paddingOverride={{ x: buttonPadding, y: buttonPadding }} onPress={prev}>
					<SvgPrev themeColor={(theme) => theme.colors.text.disabled} />
				</Button.Ghost>
				<CurrentPage>
					{page + 1} of {maxPage + 1}
				</CurrentPage>
				<Button.Ghost paddingOverride={{ x: buttonPadding, y: buttonPadding }} onPress={next}>
					<SvgNext themeColor={(theme) => theme.colors.text.disabled} />
				</Button.Ghost>
			</Controls>
		</Styles.Base>
	);
}

export default SingleItemPaginator;
