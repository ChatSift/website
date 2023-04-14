import type { ReactNode } from 'react';
import { Children, useState, useId, Fragment } from 'react';
import { Button } from '~/components/Button';
import * as Styles from '~/components/SingleItemPaginator/style';
import { noJsControlsGap, noJsControlSize } from '~/components/SingleItemPaginator/style';
import { Text } from '~/components/Text';
import SvgNext from '~/svg/SvgNext';
import SvgPrev from '~/svg/SvgPrev';

type SingleItemPaginatorProps = {
	children: [ReactNode, ReactNode, ...ReactNode[]];
};

function SingleItemPaginator({ children }: SingleItemPaginatorProps) {
	const numPages = Children.count(children);
	const maxPage = numPages - 1;
	const [page, setPage] = useState(0);
	const randId = useId();

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
			<noscript>
				<style>
					{`
						.hide-no-js {
							display: none !important;
						}
						
						.controls-no-js {
							display: flex !important;
						}
					`.replace(/\s/g, '')}
				</style>
			</noscript>
			<Styles.Content className="hide-no-js">{Children.toArray(children)[page]}</Styles.Content>
			<Styles.ControlsNoJs className="controls-no-js">
				{Children.map(children, (_, index) => (
					<Fragment key={`radio-${index}`}>
						<Styles.NoJsPageRadioButton
							id={`paginator-btn-${randId}-${index}`}
							type="radio"
							name={randId}
							title={`Page ${index + 1}`}
							style={{
								left: `calc(50% - (${numPages} * (${noJsControlSize} + ${noJsControlsGap})) / 2 + ${index} * (${noJsControlSize} + ${noJsControlsGap}) + ${noJsControlsGap} / 2)`,
							}}
							defaultChecked={index === 0}
						/>
						<Styles.Content id={`paginator-content-${randId}-${index}`}>
							{Children.toArray(children)[index]}
						</Styles.Content>
					</Fragment>
				))}
			</Styles.ControlsNoJs>
			<Styles.ControlsArrows className="hide-no-js">
				<Button buttonType="ghost" form="extraSmall" onPress={prev}>
					<SvgPrev themeColor={(theme) => theme.colors.text.disabled} />
				</Button>
				<Text color="primary">
					{page + 1} of {maxPage + 1}
				</Text>
				<Button buttonType="ghost" form="extraSmall" onPress={next}>
					<SvgNext themeColor={(theme) => theme.colors.text.disabled} />
				</Button>
			</Styles.ControlsArrows>
		</Styles.Base>
	);
}

export default SingleItemPaginator;
