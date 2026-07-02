<script lang="ts">
  import { Card } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    title?: string;
    class?: string;
  };

  const { class: className = '', children, title }: Props = $props();

  const classes = $derived(['StatsCard', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="StatsCardCard">
    <div class="header">
      {#if title}
        <h2>{title}</h2>
      {/if}
    </div>

    <div class="content">
      {@render children?.()}
    </div>
  </Card>
</div>

<style lang="scss">
  .StatsCard {
    :global(.StatsCardCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }

  .header {
    margin-bottom: calc(var(--dodo-ui-space) * 1);

    h2 {
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
    }
  }
</style>
