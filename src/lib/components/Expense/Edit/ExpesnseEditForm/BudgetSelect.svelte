<script lang="ts">
  import { page } from '$app/state';
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';

  const tripId = page.params.tripId;

  interface Props {
    onchange: (e: Event) => void;
    value: string | undefined;
  }

  const { onchange, value = 'none' }: Props = $props();

  const tragetExpenses = $state(useExpenseStore.data.filter((item) => item.tripId === tripId));
</script>

<StackItem>
  <Select {onchange} name="budgetId" label="Select budget">
    {#each tragetExpenses as expense}
      <option value={expense._id} selected={value === expense._id}>{expense.name}</option>
    {/each}
    <option value="none" selected={value === 'none'}>None</option>
  </Select>
</StackItem>
