// @ts-check
import { defineConfig } from "astro/config";
import qwikdev from "@qwikdev/astro";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://minorba-pine-products.com.au",
  integrations: [
    qwikdev({ include: ["**/qwik/*"] }),
    sitemap(),
    solidJs({ include: ["**/solid/*"] }),
    tailwind(),
  ],
});
