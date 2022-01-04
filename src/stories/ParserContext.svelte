<script lang="ts">
  import { parser } from "../lib/Markdown.svelte";
  import { setContext } from "svelte";
  import { unified } from "unified";
  import rehypeSanitize from "rehype-sanitize";
  import rehypeStringify from "rehype-stringify";
  import remarkParse from "remark-parse";
  import remarkRehype from "remark-rehype";

  setContext(parser, (md) =>
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(md)
  );
</script>

<slot />
