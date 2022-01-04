<script>
  import { onDestroy, onMount } from "svelte";
  let numDots = 0;
  let intervalId;
  $: dots = ".".repeat(numDots);
  onMount(() => {
    intervalId = setInterval(() => {
      numDots = (numDots + 1) % 4;
    }, 500);
  });
  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

Loading{dots}
