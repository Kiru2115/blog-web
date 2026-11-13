/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Address of blog-api, for example http://localhost/api/v1 */
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
