export const LogIn = `${process.env.NEXT_PUBLIC_API_URL!}/auth/v1/discord?redirect_uri=${(process.env
	.NEXT_PUBLIC_VERCEL_URL
	? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
	: process.env.NEXT_PUBLIC_SITE_URL)!}`;
