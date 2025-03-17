<script lang="ts">
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import BudgetSpecs from './BudgetSpecs.svelte';

  interface Props {
    onchange: (e: Event) => void;
    value: string | undefined;
    expenseId?: string;
    amount: number;
  }

  const { onchange, value = undefined, expenseId, amount }: Props = $props();
</script>

<StackItem>
  <Select {onchange} name="budgetId" label="Select budget">
    {#each useBudgetStore.data as budget (budget._id)}
      <option value={budget._id} selected={value === budget._id}>{budget.name}</option>
    {/each}
    <option value={undefined} selected={value === undefined}>None</option>
  </Select>

  {#if value}
    <BudgetSpecs budgetId={value} {expenseId} {amount} />
  {/if}
</StackItem>
