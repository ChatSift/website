import { ReactNode, useState } from 'react';
import {
	LoadingAnimationItem,
	PaginationButton,
	PaginationButtonListItem,
	PaginationButtons,
	PaginatorBase,
	PaginatorList,
} from './style';

interface PaginatorProps<TItem> {
	itemsPerPage: number;
	items: TItem[] | undefined;
	children: [(item: TItem) => ReactNode, () => ReactNode];
	className?: string;
}

function Paginator<TItem>(props: PaginatorProps<TItem>) {
	const [currentPage, setCurrentPage] = useState(0);

	return (
		<PaginatorBase className={props.className}>
			<PaginatorList itemsPerPage={props.itemsPerPage}>
				{props.items === undefined
					? [...(Array(props.itemsPerPage) as unknown[])].map((_, index) => (
							<li key={`${Math.floor(index / props.itemsPerPage)}-${index}`}>{props.children[1]()}</li>
					  ))
					: props.items
							.slice(currentPage * props.itemsPerPage, (currentPage + 1) * props.itemsPerPage)
							.map((item, index) => (
								<li key={`${Math.floor(index / props.itemsPerPage)}-${index}`}>{props.children[0](item)}</li>
							))}
				{props.items?.length === 0 && (
					<li>
						<img src="/assets/flushed.svg" alt="Flushed emoji" width={64} />
					</li>
				)}
			</PaginatorList>
			<PaginationButtons>
				{[...(Array(Math.ceil((props.items?.length ?? 0) / props.itemsPerPage)) as unknown[])].map((_, index) => (
					<PaginationButtonListItem key={index}>
						<PaginationButton
							onPress={() => setCurrentPage(index)}
							data-active={index === currentPage}
							aria-label={`goto page ${index + 1}`}
							style={{ animationDelay: `${index * 0.05}s` }}
						/>
					</PaginationButtonListItem>
				))}
				{props.items === undefined && (
					<>
						<LoadingAnimationItem />
						<LoadingAnimationItem style={{ animationDelay: '100ms' }} />
						<LoadingAnimationItem style={{ animationDelay: '200ms' }} />
						<LoadingAnimationItem style={{ animationDelay: '300ms' }} />
					</>
				)}
			</PaginationButtons>
		</PaginatorBase>
	);
}

export default Paginator;
