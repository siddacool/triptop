<script lang="ts">
  import { page } from '$app/state';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  const expenseId = page.params.expenseId;

  onMount(() => {
    if (!expenseId) {
      return;
    }

    useExpenseStore.fetch(expenseId);
  });
</script>

{@render children()}
