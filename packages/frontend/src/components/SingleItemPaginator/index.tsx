import type { ReactNode } from 'react';
import { Children, useState, useId, Fragment } from 'react';
import Button from '~/components/Button';
import * as Styles from '~/components/SingleItemPaginator/style';
import { buttonPadding, noJsControlsGap, noJsControlSize } from '~/components/SingleItemPaginator/style';
import SvgNext from '~/svg/SvgNext';
import SvgPrev from '~/svg/SvgPrev';

type SingleItemPaginatorProps = {
	children: [ReactNode, ReactNode, ...ReactNode[]];
};

function SingleItemPaginator(props: SingleItemPaginatorProps) {
	const numPages = Children.count(props.children);
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
							display: none;
						}
						
						.controls-no-js {
							display: flex;
						}
					`.replace(/\s/g, '')}
				</style>
			</noscript>
			<Styles.Content className="hide-no-js">{Children.toArray(props.children)[page]}</Styles.Content>
			<Styles.ControlsNoJs className="controls-no-js">
				{Children.map(props.children, (_, index) => (
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
							{Children.toArray(props.children)[index]}
						</Styles.Content>
					</Fragment>
				))}
			</Styles.ControlsNoJs>
			<Styles.ControlsArrows className="hide-no-js">
				<Button.Ghost paddingOverride={{ x: buttonPadding, y: buttonPadding }} onPress={prev}>
					<SvgPrev themeColor={(theme) => theme.colors.text.disabled} />
				</Button.Ghost>
				<Styles.CurrentPage>
					{page + 1} of {maxPage + 1}
				</Styles.CurrentPage>
				<Button.Ghost paddingOverride={{ x: buttonPadding, y: buttonPadding }} onPress={next}>
					<SvgNext themeColor={(theme) => theme.colors.text.disabled} />
				</Button.Ghost>
			</Styles.ControlsArrows>
		</Styles.Base>
	);
}

export default SingleItemPaginator;
