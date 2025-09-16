<script lang="ts">
  import type { Snippet } from 'svelte';

  interface FixedHeaderProps {
    children?: Snippet;
  }

  const { children }: FixedHeaderProps = $props();
</script>

<div class="FixedHeader">
  {@render children?.()}
</div>

<style lang="scss">
  .FixedHeader {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--dodo-color-neutral-100);
    z-index: 100;
  }
</style>
