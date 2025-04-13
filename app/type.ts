declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		HOST: string;
		API_HOST: string;
		DB_HOST: string;
		DB_DATABASE_NAME: string;
		SECRET: string;
		REFRESH_TOKEN_EXPIRE: string;
		ACCESS_TOKEN_REFRESH: string;
		ACCESS_TOKEN_EXPIRE: string;
		ACCESS_TOKEN_ALGO: string;
		ACESS_CONTROL_ALLOW_ORIGIN: string;
		LOG: string;
	}
}

declare namespace Express {
	interface Request {
		user?: any;
		profile?: any;
		post?: any;
		postData?: any;
		v: string;
	}
}