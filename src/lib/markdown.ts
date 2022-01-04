import "highlight.js/styles/default.css";
import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

export default function markdown(md: string): Promise<string> {
  return (
    // @ts-ignore: The typing of the `.process` function is incorrect. Some
    // plugins may change the output type. Specifically, rehype-stringify causes
    // it to out a string.
    unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeHighlight, { subset: false })
      // @ts-ignore: Schema is valid and pulled straight from their documentation.
      .use(rehypeSanitize, sanitizeSchema)
      .use(rehypeMathjax)
      .use(rehypeStringify)
      .process(md) as Promise<string>
  );
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [
      ...defaultSchema.attributes.div,
      ["className", "math", "math-display"],
    ],
    span: [
      ["className", "math", "math-inline"],
      [
        "className",
        "hljs-addition",
        "hljs-attr",
        "hljs-attribute",
        "hljs-built_in",
        "hljs-bullet",
        "hljs-char",
        "hljs-code",
        "hljs-comment",
        "hljs-deletion",
        "hljs-doctag",
        "hljs-emphasis",
        "hljs-formula",
        "hljs-keyword",
        "hljs-link",
        "hljs-literal",
        "hljs-meta",
        "hljs-name",
        "hljs-number",
        "hljs-operator",
        "hljs-params",
        "hljs-property",
        "hljs-punctuation",
        "hljs-quote",
        "hljs-regexp",
        "hljs-section",
        "hljs-selector-attr",
        "hljs-selector-class",
        "hljs-selector-id",
        "hljs-selector-pseudo",
        "hljs-selector-tag",
        "hljs-string",
        "hljs-strong",
        "hljs-subst",
        "hljs-symbol",
        "hljs-tag",
        "hljs-template-tag",
        "hljs-template-variable",
        "hljs-title",
        "hljs-type",
        "hljs-variable",
      ],
    ],
  },
};

export type CodeTheme =
  | "routeros"
  | "xt256"
  | "srcery"
  | "codepen-embed"
  | "pojoaque"
  | "hybrid"
  | "lightfair"
  | "magula"
  | "github"
  | "purebasic"
  | "paraiso-dark"
  | "an-old-hope"
  | "sunburst"
  | "grayscale"
  | "agate"
  | "monokai"
  | "isbl-editor-light"
  | "github-dark-dimmed"
  | "kimbie-light"
  | "arta"
  | "xcode"
  | "kimbie-dark"
  | "gradient-dark"
  | "default"
  | "paraiso-light"
  | "foundation"
  | "nnfx-dark"
  | "devibeans"
  | "brown-paper"
  | "lioshi"
  | "androidstudio"
  | "arduino-light"
  | "isbl-editor-dark"
  | "qtcreator-light"
  | "a11y-dark"
  | "night-owl"
  | "monokai-sublime"
  | "gradient-light"
  | "nnfx-light"
  | "a11y-light"
  | "vs2015"
  | "idea"
  | "color-brewer"
  | "mono-blue"
  | "tomorrow-night-blue"
  | "vs"
  | "nord"
  | "rainbow"
  | "far"
  | "atom-one-dark-reasonable"
  | "stackoverflow-dark"
  | "school-book"
  | "docco"
  | "shades-of-purple"
  | "gml"
  | "atom-one-dark"
  | "qtcreator-dark"
  | "dark"
  | "obsidian"
  | "ir-black"
  | "googlecode"
  | "stackoverflow-light"
  | "tomorrow-night-bright"
  | "ascetic"
  | "github-dark"
  | "atom-one-light";

const codeThemes: Record<CodeTheme, () => Promise<typeof import("*.css")>> = {
  routeros: () => import("highlight.js/styles/routeros.css"),
  xt256: () => import("highlight.js/styles/xt256.css"),
  srcery: () => import("highlight.js/styles/srcery.css"),
  "codepen-embed": () => import("highlight.js/styles/codepen-embed.css"),
  pojoaque: () => import("highlight.js/styles/pojoaque.css"),
  hybrid: () => import("highlight.js/styles/hybrid.css"),
  lightfair: () => import("highlight.js/styles/lightfair.css"),
  magula: () => import("highlight.js/styles/magula.css"),
  github: () => import("highlight.js/styles/github.css"),
  purebasic: () => import("highlight.js/styles/purebasic.css"),
  "paraiso-dark": () => import("highlight.js/styles/paraiso-dark.css"),
  "an-old-hope": () => import("highlight.js/styles/an-old-hope.css"),
  sunburst: () => import("highlight.js/styles/sunburst.css"),
  grayscale: () => import("highlight.js/styles/grayscale.css"),
  agate: () => import("highlight.js/styles/agate.css"),
  monokai: () => import("highlight.js/styles/monokai.css"),
  "isbl-editor-light": () =>
    import("highlight.js/styles/isbl-editor-light.css"),
  "github-dark-dimmed": () =>
    import("highlight.js/styles/github-dark-dimmed.css"),
  "kimbie-light": () => import("highlight.js/styles/kimbie-light.css"),
  arta: () => import("highlight.js/styles/arta.css"),
  xcode: () => import("highlight.js/styles/xcode.css"),
  "kimbie-dark": () => import("highlight.js/styles/kimbie-dark.css"),
  "gradient-dark": () => import("highlight.js/styles/gradient-dark.css"),
  default: () => import("highlight.js/styles/default.css"),
  "paraiso-light": () => import("highlight.js/styles/paraiso-light.css"),
  foundation: () => import("highlight.js/styles/foundation.css"),
  "nnfx-dark": () => import("highlight.js/styles/nnfx-dark.css"),
  devibeans: () => import("highlight.js/styles/devibeans.css"),
  "brown-paper": () => import("highlight.js/styles/brown-paper.css"),
  lioshi: () => import("highlight.js/styles/lioshi.css"),
  androidstudio: () => import("highlight.js/styles/androidstudio.css"),
  "arduino-light": () => import("highlight.js/styles/arduino-light.css"),
  "isbl-editor-dark": () => import("highlight.js/styles/isbl-editor-dark.css"),
  "qtcreator-light": () => import("highlight.js/styles/qtcreator-light.css"),
  "a11y-dark": () => import("highlight.js/styles/a11y-dark.css"),
  "night-owl": () => import("highlight.js/styles/night-owl.css"),
  "monokai-sublime": () => import("highlight.js/styles/monokai-sublime.css"),
  "gradient-light": () => import("highlight.js/styles/gradient-light.css"),
  "nnfx-light": () => import("highlight.js/styles/nnfx-light.css"),
  "a11y-light": () => import("highlight.js/styles/a11y-light.css"),
  vs2015: () => import("highlight.js/styles/vs2015.css"),
  idea: () => import("highlight.js/styles/idea.css"),
  "color-brewer": () => import("highlight.js/styles/color-brewer.css"),
  "mono-blue": () => import("highlight.js/styles/mono-blue.css"),
  "tomorrow-night-blue": () =>
    import("highlight.js/styles/tomorrow-night-blue.css"),
  vs: () => import("highlight.js/styles/vs.css"),
  nord: () => import("highlight.js/styles/nord.css"),
  rainbow: () => import("highlight.js/styles/rainbow.css"),
  far: () => import("highlight.js/styles/far.css"),
  "atom-one-dark-reasonable": () =>
    import("highlight.js/styles/atom-one-dark-reasonable.css"),
  "stackoverflow-dark": () =>
    import("highlight.js/styles/stackoverflow-dark.css"),
  "school-book": () => import("highlight.js/styles/school-book.css"),
  docco: () => import("highlight.js/styles/docco.css"),
  "shades-of-purple": () => import("highlight.js/styles/shades-of-purple.css"),
  gml: () => import("highlight.js/styles/gml.css"),
  "atom-one-dark": () => import("highlight.js/styles/atom-one-dark.css"),
  "qtcreator-dark": () => import("highlight.js/styles/qtcreator-dark.css"),
  dark: () => import("highlight.js/styles/dark.css"),
  obsidian: () => import("highlight.js/styles/obsidian.css"),
  "ir-black": () => import("highlight.js/styles/ir-black.css"),
  googlecode: () => import("highlight.js/styles/googlecode.css"),
  "stackoverflow-light": () =>
    import("highlight.js/styles/stackoverflow-light.css"),
  "tomorrow-night-bright": () =>
    import("highlight.js/styles/tomorrow-night-bright.css"),
  ascetic: () => import("highlight.js/styles/ascetic.css"),
  "github-dark": () => import("highlight.js/styles/github-dark.css"),
  "atom-one-light": () => import("highlight.js/styles/atom-one-light.css"),
};

export function setCodeTheme(
  theme: CodeTheme
): Promise<typeof import("*.css")> {
  return codeThemes[theme]();
}
