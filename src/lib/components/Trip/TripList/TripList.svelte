<script lang="ts">
  import type { Trip } from '$lib/stores/trip/individual.svelte';
  import Button from '$lib/ui-lib/Button';
  import SvelteVirtualList from '@humanspeak/svelte-virtual-list';
  import Icon from '@iconify/svelte';
  import TripCard from '../TripCard.svelte';

  interface TripListProps {
    data?: Trip[];
  }

  const { data = [] }: TripListProps = $props();

  const specialData = [
    {
      _id: 'add',
    },
  ] as unknown as Trip[];

  let listRef = $state();

  const dataMod = $derived([...specialData, ...data]);
</script>

<div class="TripList">
  <SvelteVirtualList items={dataMod} bind:this={listRef}>
    {#snippet renderItem(item)}
      <div class="listItem">
        {#if item._id === 'add'}
          <div class="create-button-holder">
            <Button href="/create" aria-label="Create Trip" color="primary">
              <Icon icon="material-symbols:add" /> Create Trip
            </Button>
          </div>
        {:else}
          <TripCard data={item} />
        {/if}
      </div>
    {/snippet}
  </SvelteVirtualList>
</div>

<style lang="scss">
  .TripList {
    margin-top: 16px;
    height: calc(100vh - 76px);
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;

    .listItem {
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
