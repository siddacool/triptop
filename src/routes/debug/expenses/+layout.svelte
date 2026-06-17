<script lang="ts">
  import { useAllExpenseListStore } from '$lib/stores/expense/all.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    useAllExpenseListStore.fetch();
  });
</script>

{@render children()}
