<script lang="ts" context="module">
  export type Tab = "html" | "md";
</script>

<script lang="ts">
  import markdown from "./markdown";
  import Loading from "./Loading.svelte";

  export let initialText: string = "";
  export let text: string = initialText;
  export let showTabs: boolean = true;
  export let defaultTab: Tab = "html";
  export let tab: Tab = defaultTab;
  export let htmlLabel: string = "HTML";
  export let mdLabel: string = "MD";
  export let editable: boolean = false;
  export let resizeToFit: boolean = true;
  export let minRows: number = 40;
  $: disabled = !editable;
  $: rows = resizeToFit
    ? Math.min(text.match(/\n/g)?.length + 3, minRows)
    : undefined;
</script>

<div class="markdown">
  {#if tab == "html"}
    <div class="content">
      {#await markdown(text)}
        <Loading />
      {:then response}
        {@html response}
      {/await}
    </div>
  {:else}
    <textarea {disabled} {rows} bind:value={text} />
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
  .content {
    flex: 1 1;
  }
  textarea {
    flex: 1 1;
    border: none;
    outline: none;
    resize: none;
    color: black;
  }
</style>
