<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface H2Props extends SvelteComponentProps {
    class?: string;
  }

  const { children, class: className = '' }: H2Props = $props();
</script>

<h2 class={`H3 ${className}`}>
  {#if children}
    {@render children()}
  {/if}
</h2>

<style lang="scss">
  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
  }
</style>
