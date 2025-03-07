<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
</script>

<StackItem>
  <Button onclick={useTripsFilterStore.clearFilters} disabled={!useTripsFilterStore.isFilters}>
    Clear filters
  </Button>
</StackItem>

<style>
</style>
