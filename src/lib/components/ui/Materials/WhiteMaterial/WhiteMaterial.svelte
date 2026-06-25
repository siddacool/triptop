<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
  };

  const { class: className = '', children }: Props = $props();

  const classes = $derived(['WhiteMaterial', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .WhiteMaterial {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: var(--dodo-ui-Card-default-bg);
    overflow-y: auto;
    overflow-x: hidden;
  }

  :global(.dodo-theme--dark .WhiteMaterial) {
    background-color: oklch(0.19 0.05 295.62);
  }
</style>
