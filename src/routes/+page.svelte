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

<svelte:head>
  <title>Triptop</title>
  <meta name="description" content="Triptop - Travel budgeting app" />
</svelte:head>

<header>
  <div class="inner">
    <h1>
      <img src="favicon.svg" alt="icon" />
      Triptop
    </h1>

    <div class="create-button-holder">
      <Button href="/create" aria-label="Create Trip" color="primary">
        <Icon icon="material-symbols:add" /> Create
      </Button>
    </div>
  </div>
</header>

<div class="homepage">
  <Grid spacing={4}>
    <Column></Column>
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
</div>

<style lang="scss">
  header {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;

    .inner {
      padding: 16px;
      display: flex;
      background-color: var(--dodo-color-neutral-100);
      justify-content: space-between;
      width: 100%;
      max-width: 570px;
    }

    .create-button-holder {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h1 {
      display: flex;
      font-weight: 500;
      justify-content: center;
      align-items: center;
      margin: 0;
      font-size: 1.3rem;
      letter-spacing: 1.2px;

      img {
        width: 45px;
        height: auto;
        margin-right: 12px;
      }
    }
  }

  .homepage {
    margin-top: 30px;
  }
</style>
