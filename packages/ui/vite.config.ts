/// <reference types="vitest" />
/// <reference types="vite/client" />

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), solidPlugin(), tsconfigPaths()],
  server: {
    port: 6221,
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["node_modules/@testing-library/jest-dom/vitest"],
    // if you have few tests, try commenting this
    // out to improve performance:
    isolate: false,
  },
  build: {
    target: "esnext",
  },
});
