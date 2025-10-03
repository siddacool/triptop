<script lang="ts">
  import type { Trip } from '$lib/stores/trip/individual.svelte';
  import Button from '$lib/ui-lib/Button';
  import SvelteVirtualList from '@humanspeak/svelte-virtual-list';
  import Icon from '@iconify/svelte';
  import TripCard from '../TripCard/TripCard.svelte';
  import VirtualListItem from '$lib/ui-lib/VirtualList/VirtualListItem';
  import VirtualListHolder from '$lib/ui-lib/VirtualList/VirtualListHolder';

  interface TripListProps {
    data?: Trip[];
  }

  const { data = [] }: TripListProps = $props();

  const specialData = [
    {
      _id: 'add',
    },
  ] as unknown as Trip[];

  const dataMod = $derived([...specialData, ...data]);
</script>

<div class="TripList">
  <VirtualListHolder height="calc(100vh - 76px)">
    <SvelteVirtualList items={dataMod}>
      {#snippet renderItem(item)}
        <VirtualListItem>
          {#if item._id === 'add'}
            <div class="create-button-holder">
              <Button href="/create" aria-label="Create Trip" color="primary">
                <Icon icon="material-symbols:add" /> Create Trip
              </Button>
            </div>
          {:else}
            <TripCard data={item} />
          {/if}
        </VirtualListItem>
      {/snippet}
    </SvelteVirtualList>
  </VirtualListHolder>
</div>

<style lang="scss">
  .TripList {
    margin-top: 16px;

    :global(.VirtualListItem) {
      margin-bottom: 16px;
    }

    .create-button-holder {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }
  }
</style>
