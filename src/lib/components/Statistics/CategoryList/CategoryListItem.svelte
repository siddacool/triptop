<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { CategoryOption } from '$lib/stores/expense/types';

  interface Props {
    category: CategoryOption;
  }

  const tripId = page.params.id;

  const { category }: Props = $props();

  const targetExpenses = $derived(
    useExpenseStore.data.filter(
      (item) => item.category === category.value && item.tripId === tripId,
    ),
  );

  const totalBudgetExpenses = $derived(
    targetExpenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<tr>
  <td>
    <span class="logo">
      {category.logo}
    </span>
    <span>{category.label}</span>
  </td>

  <td>
    <FormattedCurrency value={totalBudgetExpenses} />
  </td>
</tr>

<style lang="scss">
  tr {
    font-size: 1.1rem;
    .logo {
      margin-right: 6px;
    }

    td {
      padding: 10px;
      border-bottom: 1px solid var(--color-grey-400);
    }

    &:hover {
      background-color: var(--color-primary-100);
    }
  }
</style>
