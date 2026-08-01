/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute base URL of the portfolio API, e.g. `http://localhost:4100/api`. */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
