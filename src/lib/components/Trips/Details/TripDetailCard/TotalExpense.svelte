<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import AmountDisplay from '$lib/components/ui-framework/FormattedInfo/AmountDisplay.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getCurrencyWiseExpenseForTrip } from '$lib/stores/expense/expense.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import Heading from './Heading.svelte';

  const tripId = page.params.tripId;

  const expenses = $derived(getCurrencyWiseExpenseForTrip());
</script>

<div class="TotalExpense">
  <Stack space={3}>
    <StackItem>
      <Heading title="Total Expense" />
      <ul>
        {#each expenses as expense (expense.currency)}
          <li>
            <AmountDisplay currency={expense.currency} value={expense.total} />
          </li>
        {/each}
      </ul>
    </StackItem>

    {#if useLocalSettingsStore.tripDetailCardOpen}
      <StackItem>
        <div class="statsLink">
          <AnchorButton href={`/${tripId}/stats`}>Statistics</AnchorButton>
        </div>
      </StackItem>
    {/if}
  </Stack>
</div>

<style lang="scss">
  .TotalExpense {
    padding: 16px 16px;
    padding-top: 8px;
    padding-bottom: 8px;

    ul {
      margin: 0;
      padding: 0;
      display: block;
    }

    li {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 0.85rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
