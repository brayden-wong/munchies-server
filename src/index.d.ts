declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "docker";
    PORT: number;
    APP_URL: string;

    PORT: string;
    PG_HOST: string;
    PG_DATABASE: string;
    PG_USER: string;
    PG_PASSWORD: string;
    PG_PORT: number;

    AT_SECRET: string;
    RT_SECRET: string;
    AT_EXP: string;
    RT_EXP: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_SECRET: string;
    GOOGLE_CALLBACK_URL: string;

    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_SECRET_ID: string;
    FACEBOOK_CALLBACK_URL: string;

    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_CALLBACK_URL: string;
  }
}

declare global {}
