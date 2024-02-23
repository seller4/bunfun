import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import { remarkReadingTime } from './src/utils/readTime.ts'
import yaml from '@rollup/plugin-yaml'
import million from "million/compiler";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [million.vite({ mode: "react", server: true, auto: {
      threshold: 0.05,
      skip: ["useBadHook", /badVariable/g],
    }, }), yaml()],
  },
  site: 'https://funbun.vercel.app',
  markdown: {
    remarkPlugins: [remarkReadingTime],
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true,
    },
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'material-theme-palenight',
        wrap: true,
      },
      drafts: true,
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      entryLimit: 10000,
    }),
    partytown(),
  ],
});