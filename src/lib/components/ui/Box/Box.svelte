<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
  };

  const { class: className = '', children }: Props = $props();

  const classes = $derived(['Box', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .Box {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: calc(var(--dodo-ui-space) * 2);

    @media (min-width: 600px) {
      padding: calc(var(--dodo-ui-space) * 3);
    }
  }
</style>
