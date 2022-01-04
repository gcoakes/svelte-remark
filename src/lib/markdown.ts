import "highlight.js/styles/default.css";
import "katex/dist/katex.min.css";
import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
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
      .use(rehypeKatex)
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
