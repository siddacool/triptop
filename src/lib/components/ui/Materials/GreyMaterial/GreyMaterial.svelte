<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
  };

  const { class: className = '', children }: Props = $props();

  const classes = $derived(['GreyMaterial', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .GreyMaterial {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: var(--dodo-color-neutral-100);
  }

  :global(.dodo-theme--dark .GreyMaterial) {
    background-color: var(--dodo-color-neutral-50);
  }
</style>
