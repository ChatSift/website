import { singleton } from 'tsyringe';

@singleton()
export class Env {
	public readonly secretKey = process.env.SECRET_KEY!;
	public readonly discordClientId = process.env.DISCORD_CLIENT_ID!;
	public readonly authDomain = process.env.AUTH_DOMAIN!;
	public readonly discordScopes = process.env.DISCORD_SCOPES!.split(',');
	public readonly allowedRedirects = process.env.ALLOWED_REDIRECTS?.split(',') ?? [];
	public readonly port: number = parseInt(process.env.PORT ?? '8080', 10);
	public readonly isProd = process.env.NODE_ENV === 'prod';
	public readonly cors = process.env.CORS?.split(',') ?? [];

	private readonly KEYS = ['SECRET_KEY', 'DISCORD_CLIENT_ID', 'AUTH_DOMAIN', 'DISCORD_SCOPES'] as const;

	public constructor() {
		for (const key of this.KEYS) {
			if (!(key in process.env)) {
				throw new Error(`Missing required environment variable: ${key}`);
			}
		}
	}
}
