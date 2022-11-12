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
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
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
			{
				source: '/invites/ama',
				destination:
					'https://discord.com/api/oauth2/authorize?client_id=872022469081448489&permissions=274878024704&scope=applications.commands%20bot',
				permanent: true,
			},
			{
				source: '/invites/automoderator',
				destination:
					'https://discord.com/api/oauth2/authorize?client_id=847081327950168104&permissions=1100451531910&scope=applications.commands%20bot',
				permanent: true,
			},
			{
				source: '/invites/modmail',
				destination:
					'https://discord.com/api/oauth2/authorize?client_id=981971797480210523&permissions=326686075904&scope=bot%20applications.commands',
				permanent: true,
			},
			{
				source: '/kofi',
				destination: 'https://ko-fi.com/chatsift',
				permanent: true,
			},
		];
	},
};
