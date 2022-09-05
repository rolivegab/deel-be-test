declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    PORT: string;
  }
}
