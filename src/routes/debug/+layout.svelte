<script lang="ts">
  import { useTripListStore } from '$lib/stores/trip/list.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    useTripListStore.fetch();
  });
</script>

<main>
  {@render children()}
</main>

<style>
  main {
    padding: var(--dodo-ui-space);
  }
</style>
