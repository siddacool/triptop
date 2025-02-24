<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type MainLayoutProps = SvelteComponentProps;

  const { children }: MainLayoutProps = $props();
</script>

<main class="MainLayout">
  {#if children}
    {@render children()}
  {/if}
</main>

<style lang="scss">
  main {
    background-color: var(--color-backdrop);
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
