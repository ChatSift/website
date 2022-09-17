/**
 * @type {import('next').NextConfig}
 */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	productionBrowserSourceMaps: true,
	cleanDistDir: true,
	redirects() {
		return [
			{
				source: '/github',
				destination: 'https://github.com/ChatSift',
				permanent: true,
			},
			{
				source: '/support',
				destination: 'https://discord.gg/tgZ2pSgXXv',
				permanent: true,
			},
		];
	},
};
