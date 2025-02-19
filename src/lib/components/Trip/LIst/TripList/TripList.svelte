<script lang="ts">
  import ItemList from '$lib/components/ItemList.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import StyledCard from './StyledCard.svelte';

  const mounted = $derived(useTripsStore.mounted ? true : false);
</script>

{#if mounted && useTripsStore.data.length}
  <StackItem>
    <div class="TripList">
      <ItemList>
        {#each useTripsStore.data as trip}
          <StyledCard {trip} />
        {/each}
      </ItemList>
    </div>
  </StackItem>
{/if}

<style lang="scss">
  .TripList {
    :global(.Card) {
      min-height: 100px;
    }
  }
</style>
