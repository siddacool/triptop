<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import ItemList from '../ItemList.svelte';
  import Card from '../ui-framework/Layout/Card.svelte';

  interface Props extends SvelteComponentProps {
    class?: string;
  }

  const { children, class: className = '' }: Props = $props();
</script>

<div class={`StatsCard ${className}`}>
  <Card>
    <ItemList>
      {#if children}
        {@render children()}
      {/if}
    </ItemList>
  </Card>
</div>

<style lang="scss">
  .StatsCard {
    :global(.Card) {
      padding: 0;
    }
  }
</style>
