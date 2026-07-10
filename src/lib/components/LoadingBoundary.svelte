<script lang="ts">
  import type { Snippet } from 'svelte';
  import Loading from './ui/Loading/Loading.svelte';

  type Props = {
    children?: Snippet;
    loading?: boolean;
  };

  const { loading = false, children }: Props = $props();
</script>

{#if loading}
  <Loading />
{:else}
  {@render children?.()}
{/if}
