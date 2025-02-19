<script lang="ts">
  import { page } from '$app/state';
  import EditTrip from '$lib/components/Trip/EditTrip/EditTrip.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { downloadFile } from '$lib/helpers/download-file';
  import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { LibraryData } from '$lib/stores/library/types';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));

  let downloading = $state(false);

  async function onDownload(e: MouseEvent) {
    try {
      e.preventDefault();
      e.stopPropagation();

      const trip = useTripsStore.data.find((item) => item._id === id);

      if (!trip) {
        return;
      }

      const budget = useBudgetStore.data.filter((item) => item.tripId === id);
      const expense = useExpenseStore.data.filter((item) => item.tripId === id);
      const createdAt = Date.now();

      const exportData: LibraryData = {
        trip,
        budget,
        expense,
        createdAt,
      };

      const data = new Blob([JSON.stringify(exportData)], { type: 'text/plain' });

      const simplifiedName = simplifyText(trip.name, true).toLocaleLowerCase();

      await downloadFile(`${simplifiedName}_${createdAt}.trip.json.txt`, data);
    } catch (e) {
      console.error(e);
    } finally {
      downloading = false;
    }
  }
</script>

<title>Edit: {targetTrip?.name}</title>

{#if mounted && targetTrip}
  <h2>
    Edit: {targetTrip.name}
    <Button
      class="downloadTrip"
      onclick={onDownload}
      disabled={downloading}
      compact
      title="Export trip"
    >
      <Icon icon="material-symbols:download-rounded" />
    </Button>
  </h2>

  <EditTrip tripId={id} />
{/if}

<style lang="scss">
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
