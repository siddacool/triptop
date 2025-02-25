<script lang="ts">
  import { page } from '$app/state';
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';

  const tripId = page.params.tripId;

  interface Props {
    onchange: (e: Event) => void;
    value: string | undefined;
  }

  const { onchange, value = 'none' }: Props = $props();

  const tragetBudgets = $state(useBudgetStore.data.filter((item) => item.tripId === tripId));
</script>

<StackItem>
  <Select {onchange} name="budgetId" label="Select budget">
    {#each tragetBudgets as budget}
      <option value={budget._id} selected={value === budget._id}>{budget.name}</option>
    {/each}
    <option value="none" selected={value === 'none'}>None</option>
  </Select>
</StackItem>
