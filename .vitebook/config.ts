import { clientPlugin, defineConfig } from "@vitebook/client/node";
import {
  defaultThemePlugin,
  DefaultThemeConfig,
} from "@vitebook/theme-default/node";
import path from "path";

export default defineConfig<DefaultThemeConfig>({
  include: ["src/**/*.story.svelte"],
  plugins: [clientPlugin({ appFile: "App.svelte" }), defaultThemePlugin()],
  site: {
    title: "svelte-remark",
    description: "Markdown viewer Svelte component.",
    theme: {},
  },
});
