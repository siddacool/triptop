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
    
  }
</style>
