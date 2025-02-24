<script lang="ts">
  import { page } from '$app/state';
  import H2 from '$lib/components/ui-framework/Headings/H2.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import ExportTrip from './ExportTrip.svelte';

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));
</script>

<title>Edit: {targetTrip?.name}</title>

<StackItem>
  <header>
    <H2>
      Edit: {targetTrip?.name}
    </H2>

    <ExportTrip />
  </header>
</StackItem>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
