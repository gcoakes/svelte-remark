import {
  clientPlugin,
  defineConfig,
} from '@vitebook/client/node';
import { defaultThemePlugin } from '@vitebook/theme-default/node';

export default defineConfig({
  include: ['src/**/*.svelte'],
  plugins: [clientPlugin({ appFile: 'App.svelte' }), defaultThemePlugin()],
  site: {
    title: 'markdown-svelte',
    description: 'Markdown viewer Svelte component',
    /** @type {(import('@vitebook/theme-default/node').DefaultThemeConfig} */
    theme: {},
  },
});
