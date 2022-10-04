import process from 'node:process';
import { singleton } from 'tsyringe';

@singleton()
export class Env {
	public readonly secretKey = process.env.SECRET_KEY!;

	public readonly discordClientId = process.env.DISCORD_CLIENT_ID!;

	public readonly discordClientSecret = process.env.DISCORD_CLIENT_SECRET!;

	public readonly discordScopes = new Set(process.env.DISCORD_SCOPES!.split(','));

	public readonly domain = process.env.DOMAIN!;

	public readonly allowedRedirects: RegExp = new RegExp(process.env.ALLOWED_REDIRECTS ?? '$^');

	public readonly port: number = Number.parseInt(process.env.PORT ?? '8080', 10);

	public readonly isProd = process.env.NODE_ENV === 'prod';

	public readonly cors: RegExp | null = process.env.CORS ? new RegExp(process.env.CORS) : null;

	public readonly automoderatorAPIURL = process.env.AUTOMODERATOR_API_URL!;

	public readonly amaAPIURL = process.env.AMA_API_URL!;

	public readonly modmailAPIURL = process.env.MODMAIL_API_URL!;

	public readonly automoderatorToken = process.env.AUTOMODERATOR_TOKEN!;

	public readonly amaToken = process.env.AMA_TOKEN!;

	public readonly modmailToken = process.env.MODMAIL_TOKEN!;

	public get scopesString(): string {
		return [...this.discordScopes].join(' ');
	}

	private readonly KEYS = [
		'SECRET_KEY',
		'DISCORD_CLIENT_ID',
		'DISCORD_CLIENT_SECRET',
		'DISCORD_SCOPES',
		'DOMAIN',
		'AUTOMODERATOR_API_URL',
		'AMA_API_URL',
		'MODMAIL_API_URL',
		'AUTOMODERATOR_TOKEN',
		'AMA_TOKEN',
		'MODMAIL_TOKEN',
	] as const;

	public constructor() {
		for (const key of this.KEYS) {
			if (!(key in process.env)) {
				throw new Error(`Missing required environment variable: ${key}`);
			}
		}
	}
}
