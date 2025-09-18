<script lang="ts">
  import Divider from '$lib/components/Divider.svelte';
  import TripList from '$lib/components/Trip/TripList';
  import { useTripsStore } from '$lib/stores/trip/list.svelte';
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

<div class="homepage">
  <header>
    <h1>
      <img src="favicon.svg" alt="icon" />
      Triptop
    </h1>
  </header>
  <TripList data={useTripsStore.data} />
</div>

<style lang="scss">
  .homepage {
    header {
      display: flex;
      justify-content: center;
      width: 100%;
      padding-bottom: 0;
      height: 38px;

      @media (min-width: 1024px) {
        height: 42.75px;
      }

      h1 {
        display: flex;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        margin: 0;
        font-size: 1.2rem;
        letter-spacing: 1.2px;

        img {
          width: 38px;
          height: auto;
          margin-right: 12px;
        }
      }
    }
  }
</style>
