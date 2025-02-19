<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface ItemListProps extends SvelteComponentProps {
    class?: string;
  }

  const { children, class: className = '' }: ItemListProps = $props();
</script>

<ul class={`ItemList ${className}`}>
  {#if children}
    {@render children()}
  {/if}
</ul>

<style lang="scss">
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }
</style>
