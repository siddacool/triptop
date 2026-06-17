<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId || '';
  const expenseId = page.params.expenseId || '';
</script>

<Button
  aria-label="Expense settings"
  class="ExpensePageEditExpense"
  variant="text"
  roundness="pill"
  title="Expense settings"
  href={resolve(`/trips/${tripId}/expenses/${expenseId}/edit`)}
  outline
>
  <Icon icon="material-symbols:settings-outline-rounded" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.ExpensePageEditExpense) {
    font-size: 1.5rem;
  }
</style>
