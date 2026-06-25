<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import GreyMaterial from '../ui/Materials/GreyMaterial/GreyMaterial.svelte';

  export type MainProps = {
    children?: Snippet;
  };
</script>

<script lang="ts">
  let { children }: MainProps = $props();
</script>

<main class="Main">
  <GreyMaterial>
    {@render children?.()}
  </GreyMaterial>
</main>

<style lang="scss">
  .Main {
    flex: 1;
    min-height: 100vh;
    color: var(--dodo-color-neutral-800);

    :global(.GreyMaterial) {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
