/// <reference types='vite/cliente'/>

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_APP_ID: string
  readonly VITE_SOME_KEY: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}