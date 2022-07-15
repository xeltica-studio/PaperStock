declare namespace NodeJS {
  // 環境変数名の定義
  interface ProcessEnv {
    DATABASE_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
  }
}