<script lang="ts">
  import TripCard from '$lib/components/Trip/TripCard.svelte';
  import { useTripsStore } from '$lib/stores/trip/list.svelte';
  import Button from '$lib/ui-lib/Button';
  import Loader from '$lib/ui-lib/Loader/Loader.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    useTripsStore.fetch();

    return () => {
      useTripsStore.reset();
    };
  });
</script>

<Grid spacing={4}>
  <Column>
    <h1>
      <img src="favicon.svg" alt="icon" />
      Triptop
    </h1>
    <h3>Travel budgeting app</h3>
  </Column>
  <Column>
    <div class="create-button-holder">
      <Button href="/create" aria-label="Create Trip" color="primary">
        <Icon icon="material-symbols:add" /> Create Trip
      </Button>
    </div>
  </Column>
  {#if useTripsStore.fetching}
    <Column>
      <Loader />
    </Column>
  {:else if useTripsStore.data?.length}
    <Column>
      <div class="trips">
        <Grid spacing={2}>
          {#each useTripsStore.data as trip (trip._id)}
            <Column>
              <TripCard data={trip} />
            </Column>
          {/each}
        </Grid>
      </div>
    </Column>
  {/if}
</Grid>

<style lang="scss">
  h1 {
    display: flex;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    margin-top: 0;

    img {
      width: 45px;
      height: auto;
      margin-right: 12px;
    }
  }

  h3 {
    text-align: center;
    margin: 0;
    font-weight: 400;
  }

  .create-button-holder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .trips {
    max-height: calc(100vh - 259px);
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
