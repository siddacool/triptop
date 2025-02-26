import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
import { useTripsStore } from '$lib/stores/trips/trips.svelte';

export type Breadcrumb = {
  label: string;
  value: string;
  route: string;
};

export function createBreadcrumbs(
  route: string | null,
  tripId: string,
  expenseId: string,
  budgetId: string,
) {
  const targetTrip = useTripsStore.data.find((item) => item._id === tripId);
  const targetExpense = useExpenseStore.data.find((item) => item._id === expenseId);
  const targetBudget = useBudgetStore.data.find((item) => item._id === budgetId);

  const breadcrumbs: Breadcrumb[] = [];
  const routes = route?.split('/') || [];

  routes.forEach((item) => {
    const label = item
      .replace('[tripId]', targetTrip?.name || '')
      .replace('[expenseId]', targetExpense?.name || '')
      .replace('[budgetId]', targetBudget?.name || '');

    const value = item
      .replace('[tripId]', targetTrip?._id || '')
      .replace('[expenseId]', targetExpense?._id || '')
      .replace('[budgetId]', targetBudget?._id || '');

    let route = `/${value}`;

    const lastItem = breadcrumbs[breadcrumbs.length - 1];

    if (lastItem) {
      route = `${lastItem.route}/${value}`;

      if (!value) {
        return;
      }
    }

    breadcrumbs.push({
      label: label || 'Home',
      value,
      route: route.replace('//', '/'),
    });
  });

  return breadcrumbs;
}
