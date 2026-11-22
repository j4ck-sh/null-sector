
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  ...(site ? { site } : {}),
  base,
  trailingSlash: 'always',
  integrations: [
    ...(site ? [sitemap()] : []),
  ],
});
