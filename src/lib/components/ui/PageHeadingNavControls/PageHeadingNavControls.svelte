<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
  };

  let { children, class: className = '' }: Props = $props();

  const classes = $derived(['PageHeadingNavControls', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .PageHeadingNavControls {
    display: flex;
    margin: 0 -2px;

    :global(.dodo-ui-Button) {
      margin: 0 2px;
    }
  }
</style>
