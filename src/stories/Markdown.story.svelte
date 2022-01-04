<script lang="ts">
  import { Variant } from "@vitebook/client";

  import Markdown from "../lib/Markdown.svelte";
  import lorem from "./lorem.json";
  import ParserContext from "./ParserContext.svelte";
</script>

<Variant name="Default">
  <Markdown text={lorem} />
</Variant>

<Variant name="Editor">
  <Markdown
    initialText={lorem}
    editable={true}
    htmlLabel="Visual"
    mdLabel="Text"
    defaultTab="md"
  />
</Variant>

<Variant name="Resizing">
  <Markdown text={lorem} resizeToFit={true} />
</Variant>

<Variant name="Controls">
  <Markdown initialText={lorem} resizeToFit={true}>
    <svelte:fragment slot="controls">
      <div class="subdued">Some long label for this document.</div>
      <div>Submit</div>
    </svelte:fragment>
  </Markdown>
</Variant>

<Variant name="Stretch">
  <div class="stretch">
    <Markdown text={lorem} />
  </div>
</Variant>

<Variant name="Customer Parser">
  <ParserContext>
    <Markdown text={lorem} />
  </ParserContext>
</Variant>

<style>
  .subdued {
    color: grey;
  }
  .stretch {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
  }
</style>
