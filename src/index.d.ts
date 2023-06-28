declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PORT: string;
    PG_HOST: string;
    PG_DATABASE: string;
    PG_USER: string;
    PG_PASSWORD: string;
  }
}
