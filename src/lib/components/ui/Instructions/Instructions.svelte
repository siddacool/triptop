<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
  };

  const { class: className = '', children }: Props = $props();

  const classes = $derived(['Instructions', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .Instructions {
    text-align: center;
    color: var(--dodo-color-neutral-700);
    font-size: 1.1rem;
    padding: calc(var(--dodo-ui-space) * 4) 0;
    line-height: 1.4;

    @media (min-width: 600px) {
      font-size: 1.3rem;
    }
  }
</style>
