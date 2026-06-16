<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export type MainProps = {
    children?: Snippet;
  };
</script>

<script lang="ts">
  let { children }: MainProps = $props();
</script>

<main class="Main">
  {@render children?.()}
</main>

<style lang="scss">
  .Main {
    flex: 1;
    overflow-y: auto;
    min-height: 100px;
    color: var(--dodo-color-neutral-800);
    background-color: var(--dodo-color-neutral-100);
    z-index: 0;

    @media (min-width: 600px) {
      margin-top: calc(var(--dodo-ui-space) * -2);
    }
  }

  :global(.dodo-theme--dark .Main) {
    background-color: var(--dodo-color-neutral-50);
  }
</style>
