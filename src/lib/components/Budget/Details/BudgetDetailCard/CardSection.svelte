<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface props extends SvelteComponentProps {
    label?: string;
  }

  const { label, children }: props = $props();
</script>

<article>
  {#if label}
    <section>{label}</section>
  {/if}

  {#if children}
    <section>{@render children()}</section>
  {/if}
</article>

<style lang="scss">
  article {
    padding: 14px 20px;
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    padding-bottom: 20px;
    flex-direction: column;

    section {
      &:first-child {
        margin: 0;
        margin-bottom: 8px;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }
  }
</style>
