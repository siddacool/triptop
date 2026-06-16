<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export type MainProps = {
    children?: Snippet;
  };
</script>

<script lang="ts">
  let { children }: MainProps = $props();
</script>

<main>
  {@render children?.()}
</main>

<style lang="scss">
  main {
    flex: 1;
    overflow-y: auto;
    min-height: 100px;
    color: var(--dodo-color-neutral-800);
    background-color: var(--dodo-color-neutral-100);
  }
</style>
