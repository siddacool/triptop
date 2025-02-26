<script lang="ts">
  import { page } from '$app/state';
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import BudgetSpecs from './BudgetSpecs.svelte';

  const tripId = page.params.tripId;

  interface Props {
    onchange: (e: Event) => void;
    value: string | undefined;
    expenseId?: string;
    amount: number;
  }

  const { onchange, value = undefined, expenseId, amount }: Props = $props();

  const targetBudgets = $state(useBudgetStore.data.filter((item) => item.tripId === tripId));
</script>

<StackItem>
  <Select {onchange} name="budgetId" label="Select budget">
    {#each targetBudgets as budget}
      <option value={budget._id} selected={value === budget._id}>{budget.name}</option>
    {/each}
    <option value={undefined} selected={value === undefined}>None</option>
  </Select>

  {#if value}
    <BudgetSpecs budgetId={value} {expenseId} {amount} />
  {/if}
</StackItem>
