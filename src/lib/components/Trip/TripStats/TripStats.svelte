<script lang="ts">
  import ExportCsv from '$lib/components/Expense/ExportTrip/ExportCsv';
  import ExportJson from '$lib/components/Expense/ExportTrip/ExportJson';
  import TotalExpense from '$lib/components/Expense/TotalExpense';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import LightAccordian from '$lib/ui-lib/LightAccordian';

  interface TripStatsProps {
    expenses?: Expense[];
  }

  const { expenses }: TripStatsProps = $props();
</script>

{#if expenses?.length}
  <div class="TripStats">
    <LightAccordian>
      {#snippet header()}
        <div class="amount"><TotalExpense data={expenses} /></div>
      {/snippet}

      <div class="tools">
        <ExportCsv />
        <ExportJson />
      </div>
    </LightAccordian>
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
