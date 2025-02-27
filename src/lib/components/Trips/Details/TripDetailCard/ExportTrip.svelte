<script lang="ts" module>
  export type ExportTripData = {
    _id: string;
    trip: Trip;
    expense: Expense[];
    budget: Budget[];
    exportedAt: Date;
  };
</script>

<script lang="ts">
  import { page } from '$app/state';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { downloadFile } from '$lib/helpers/download-file';
  import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
  import { getMoment } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import type { Budget } from '$lib/stores/budget/types';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { Trip } from '$lib/stores/trips/types';

  const tripId = page.params.tripId;
  let loading = $state(false);

  async function exportTripToJson() {
    try {
      loading = true;

      const trip = useTripsStore.data.find((item) => item._id === tripId);

      if (!trip) {
        throw Error('No trip found');
      }

      const expense = useExpenseStore.data.filter((item) => item.tripId === trip._id);
      const budget = useBudgetStore.data.filter((item) => item.tripId === trip._id);
      const exportedAt = new Date();

      const exportData: ExportTripData = {
        _id: trip._id,
        trip,
        expense,
        budget,
        exportedAt,
      };

      const data = new Blob([JSON.stringify(exportData)], { type: 'text/plain' });

      const simplifiedName = simplifyText(trip.name, true).toLowerCase();

      await downloadFile(
        `${simplifiedName}.${getMoment(exportedAt).format('DD-MM-YYYY_HH-mm-ss')}.json.txt`,
        data,
      );
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  }
</script>

<div class="ExportTrip">
  <Button disabled={loading} onclick={exportTripToJson}>Export trip (JSON)</Button>
</div>

<style lang="scss">
  .ExportTrip {
    padding: 20px 20px;
    padding-bottom: 32px;
  }
</style>
