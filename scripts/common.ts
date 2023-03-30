import {fileURLToPath, URL} from "node:url";

export const alias = {
  '@': fileURLToPath(new URL('../src', import.meta.url)),
}