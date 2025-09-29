<script lang="ts">
  import ExportCsv from '$lib/components/Trip/ExportTrip/ExportCsv';
  import ExportJson from '$lib/components/Trip/ExportTrip/ExportJson';
  import TotalExpense from '$lib/components/Expense/TotalExpense';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import { getMoment } from '@flightlesslabs/utils';
  import Accordian from '$lib/ui-lib/Accordian';
  import {
    getIsAnyFilters,
    useExpenseFiltersStore,
  } from '$lib/stores/expense/filters/index.svelte';
  import FilterActiveDot from '$lib/components/FilterActiveDot.svelte';

  interface TripStatsProps {
    expenses?: Expense[];
  }

  const { expenses }: TripStatsProps = $props();

  const firstExpense = $derived(
    expenses?.length
      ? getMoment(expenses[expenses.length - 1].date).format('MMM D, YYYY')
      : undefined,
  );

  const lastExpense = $derived(
    expenses?.length ? getMoment(expenses[0].date).format('MMM D, YYYY') : undefined,
  );

  let open = $state(false);
</script>

{#if expenses?.length}
  <div class="TripStats">
    <Accordian bind:open>
      {#snippet header()}
        {#if open}
          <div class="details">
            Details <FilterActiveDot show={useExpenseFiltersStore.isAnyFilters} />
          </div>
        {:else}
          <div class="amount"><TotalExpense data={expenses} /></div>
        {/if}
      {/snippet}

      <div class="content">
        <div class="contentGroup totalExpense">
          <p>Total Expenes:</p>
          <article class="amount"><TotalExpense data={expenses} /></article>
        </div>

        <div class="contentGroup">
          <p>Trip Period:</p>
          <article>
            <b>{firstExpense}</b> to <b>{lastExpense}</b>
          </article>
        </div>

        <div class="contentGroup tools">
          <ExportCsv />
          <ExportJson />
        </div>
      </div>
    </Accordian>
  </div>
{/if}

<style lang="scss">
  .TripStats {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .amount {
      display: flex;
      align-items: center;
    }

    .content {
      .contentGroup {
        margin-bottom: 16px;
      }

      p {
        font-size: 0.9rem;
        margin-top: 3px;
        margin-bottom: 6px;
        color: var(--dodo-color-neutral-600);
      }

      article {
        font-size: 1rem;
        color: var(--dodo-color-neutral-700);
      }

      b {
        font-weight: 500;
      }
    }

    .totalExpense {
      :global(.TotalExpense) {
        font-size: 1.1rem;
      }
    }

    .tools {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 24px;
    }
  }
</style>
