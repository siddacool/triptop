<script lang="ts">
  import { page } from '$app/state';
  import { getMoment } from '$lib/helpers/time';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const tripId = page.params.tripId;
  const startDate = $derived(useTripsStore.data.find((item) => item._id === tripId)?.startDate);
  const endDate = $derived(useTripsStore.data.find((item) => item._id === tripId)?.startDate);
</script>

<div class="TripDate">
  <section>Date</section>
  <section>
    {startDate ? getMoment(startDate).format('D MMM YYYY') : ''} - {endDate
      ? getMoment(endDate).format('D MMM YYYY')
      : ''}
  </section>
</div>

<style lang="scss">
  .TripDate {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
  }
</style>
