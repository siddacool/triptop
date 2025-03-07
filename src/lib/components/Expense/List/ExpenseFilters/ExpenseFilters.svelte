<script lang="ts">
  import Filter from '$lib/components/Filter.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import CategoryPanel from './CategoryPanel.svelte';
  import ClearFilters from './ClearFilters.svelte';
</script>

<StackItem>
  <Filter
    open={useTripsFilterStore.open}
    onclick={useTripsFilterStore.toggleFiltersPanelOpen}
    isFilter={useTripsFilterStore.isFilters}
  >
    <div class="enclosure">
      <Card>
        <Stack space={2}>
          <CategoryPanel />
          <StackItem />
          <ClearFilters />
        </Stack>
      </Card>
    </div>
  </Filter>
</StackItem>

<style lang="scss">
  .enclosure {
    :global(.Card) {
      padding: 24px 16px;
    }
  }
</style>
