const mediaQueriesRaw = {
	small: 650,
	medium: 800,
} as const;

type MediaQueries = { [key in keyof typeof mediaQueriesRaw]: string };

const mediaQueries = Object.entries(mediaQueriesRaw)
	.map(([k, v]) => ({ [k]: `@media (min-width: ${v}px)` }))
	.reduce((acc, next) => ({ ...acc, ...next }), {}) as MediaQueries;

export default mediaQueries;
