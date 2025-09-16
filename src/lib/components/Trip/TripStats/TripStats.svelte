<script lang="ts">
  import ExportCsv from '$lib/components/Expense/ExportTrip/ExportCsv';
  import TotalExpense from '$lib/components/Expense/TotalExpense';
  import type { Expense } from '$lib/stores/expense/individual.svelte';

  interface TripStatsProps {
    expenses?: Expense[];
  }

  const { expenses }: TripStatsProps = $props();
</script>

{#if expenses?.length}
  <div class="TripStats">
    <div class="amount"><TotalExpense data={expenses} /></div>
    <div class="tool">
      <ExportCsv />
    </div>
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
  }
</style>
