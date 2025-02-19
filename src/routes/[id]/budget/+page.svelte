<script lang="ts">
  import { page } from '$app/state';
  import BudgetList from '$lib/components/Budget/List/BudgetList/BudgetList.svelte';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import H2 from '$lib/components/ui-framework/Headings/H2.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const tripId = page.params.id;
</script>

{#if mounted}
  <Stack space={3}>
    <StackItem>
      <H2>Budget</H2>
    </StackItem>
    <StackItem>
      <BudgetList />
    </StackItem>

    <StackItem>
      <div class="create">
        <AnchorButton href={`/${tripId}/budget/create`} variant="primary" compact>
          <Icon icon="mdi:plus" />
        </AnchorButton>
      </div>
    </StackItem>
  </Stack>
{/if}

<style lang="scss">
  .create {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
