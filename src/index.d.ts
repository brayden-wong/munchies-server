declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "docker";
    PORT: string;
    PG_HOST: string;
    PG_DATABASE: string;
    PG_USER: string;
    PG_PASSWORD: string;
    PG_PORT: number;
  }
}

declare global {
  namespace Express {
    export interface GoogleUser {
      provider: "google";
      providerId: string;
      email: string;
      name: string;
      picture: string;
    }
  }
}
