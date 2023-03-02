import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { getCssText } from '~/stitches/stitches.config';

function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* eslint-disable-next-line react/no-danger */}
				<style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default Document;
