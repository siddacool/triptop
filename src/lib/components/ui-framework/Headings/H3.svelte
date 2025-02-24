<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface H3Props extends SvelteComponentProps {
    class?: string;
  }

  const { children, class: className = '' }: H3Props = $props();
</script>

<h3 class={`H3 ${className}`}>
  {#if children}
    {@render children()}
  {/if}
</h3>

<style lang="scss">
  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
  }
</style>
