<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import { calculatePercentage } from '$lib/helpers/percentage';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { CategoryOption } from '$lib/stores/expense/types';
  import Progress from '../Progress.svelte';

  interface Props {
    category: CategoryOption;
    totalExpenses: number;
  }

  const tripId = page.params.id;

  const { category, totalExpenses }: Props = $props();

  const targetExpenses = $derived(
    useExpenseStore.data.filter(
      (item) => item.category === category.value && item.tripId === tripId,
    ),
  );

  const totalBudgetExpenses = $derived(
    targetExpenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );

  const diff = $derived(calculatePercentage(totalBudgetExpenses, totalExpenses));
</script>

<tr>
  <td>
    <span class="logo">
      {category.logo}
    </span>
    <span>{category.label}</span>
  </td>

  <td>
    <Progress value={diff} />
  </td>

  <td>
    <FormattedCurrency value={totalBudgetExpenses} />
  </td>
</tr>

<style lang="scss">
  tr {
    .logo {
      margin-right: 3px;
    }
  }
</style>
