<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
  };

  const { class: className = '', children }: Props = $props();

  const classes = $derived(['FieldHeader', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .FieldHeader {
    display: flex;
    color: var(--dodo-color-neutral-800);
    font-size: 1.2rem;
    font-weight: 500;
  }
</style>
