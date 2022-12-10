import Head from 'next/head';

type PageMetaProps = {
	description?: string;
	title: string;
};

function PageMeta(props: PageMetaProps) {
	const title = props.title;

	return (
		<Head>
			<title>{title}</title>
			<meta content={title} property="og:title" />
			<meta content="ChatSift" property="og:site_name" />
			<meta content="/assets/chatsift.png" property="og:image" />
			<meta
				content={props.description ?? 'A powerful solution for your day-to-day moderation bot needs.'}
				property="description"
			/>
			<meta name="theme-color" content="#318EEE" />
		</Head>
	);
}

export default PageMeta;
