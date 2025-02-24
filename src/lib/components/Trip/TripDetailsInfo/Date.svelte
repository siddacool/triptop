<script lang="ts">
  import { page } from '$app/state';
  import { getMoment } from '$lib/helpers/time';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import StatsTemplate from './StatsTemplate.svelte';

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));
</script>

<StatsTemplate>
  {#snippet label()}
    Date
  {/snippet}
  {#snippet value()}
    {getMoment(targetTrip?.startDate).format('D MMM YYYY')} - {getMoment(
      targetTrip?.endDate,
    ).format('D MMM YYYY')}
  {/snippet}
</StatsTemplate>
