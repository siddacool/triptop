<script lang="ts">
  import { page } from '$app/state';
  import { createBreadcrumbs } from '$lib/helpers/breadcumbs.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const routesActive = $derived(page.route.id);
  const id = $derived(page.params.id);
  const expenseId = $derived(page.params.expenseId);
  const budgetId = $derived(page.params.budgetId);

  const crumbs = $derived(createBreadcrumbs(routesActive, id, expenseId, budgetId));

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );
</script>

{#if mounted}
  <ul>
    {#each crumbs as crumb}
      <li>
        <a href={`${crumb.route}`}>{crumb.label}</a>
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    margin: 0 4px;
    padding: 0;
    display: flex;

    &:after {
      content: '/';
      color: var(--color-grey-400);
    }

    a {
      margin-right: 4px;
      text-decoration: none;
      color: var(--color-primary-800);
      font-weight: 500;
      font-size: 1rem;
    }

    &:last-child {
      &:after {
        display: none;
      }

      a {
        color: inherit;
        cursor: default;
        font-weight: 600;
      }
    }
  }
</style>
