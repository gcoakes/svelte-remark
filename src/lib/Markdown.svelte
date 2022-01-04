<script lang="ts" context="module">
  export { setCodeTheme } from "./markdown";
  export type Tab = "html" | "md";
  export type Parser = (string) => Promise<string>;
  export const parser = {};
</script>

<script lang="ts">
  import markdown from "./markdown";
  import Loading from "./Loading.svelte";
  import { getContext } from "svelte";

  export let initialText = "";
  export let text: string = initialText;
  export let showTabs = true;
  export let defaultTab: Tab = "html";
  export let tab: Tab = defaultTab;
  export let htmlLabel = "HTML";
  export let mdLabel = "MD";
  export let editable = false;
  export let resizeToFit = true;
  export let minRows = 40;
  $: disabled = !editable;
  $: rows = resizeToFit
    ? Math.max(text.match(/\n/g)?.length + 3, minRows)
    : undefined;

  const parse = getContext<Parser>(parser) || markdown;
</script>

<div class="markdown">
  {#if tab == "html"}
    {#await parse(text)}
      <div class="loader">
        <slot name="loading">
          <Loading />
        </slot>
      </div>
    {:then response}
      <div class="content">
        {@html response}
      </div>
    {/await}
  {:else}
    <textarea class="content" {disabled} {rows} bind:value={text} />
  {/if}
  {#if showTabs}
    <div class="tabs">
      <div class:active={tab == "html"} on:click={() => (tab = "html")}>
        {htmlLabel}
      </div>
      <div class:active={tab == "md"} on:click={() => (tab = "md")}>
        {mdLabel}
      </div>
      {#if $$slots.controls}
        <div class="controls-gap" />
        <slot name="controls" />
      {/if}
    </div>
  {/if}
</div>

<style>
  .markdown {
    flex: 1 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
  }
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
  }
  .tabs > :global(div) {
    flex: 0 0 content;
    min-width: 5rem;
    padding: 0.5rem;
    text-align: center;
  }
  .tabs > div.active {
    border-top: 2px solid black;
  }
  .controls-gap {
    flex: 1 1;
  }
  .loader {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content {
    flex: 1 1;
    overflow: auto;
  }
  textarea {
    border: none;
    outline: none;
    resize: none;
    color: black;
  }
</style>
