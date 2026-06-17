<script>
  import { resolve } from '$app/paths';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';
  import { createDate } from '@flightlesslabs/time-utils';
</script>

<div></div>

<svelte:head>
  <title>debug:trips</title>
</svelte:head>

<h2>Trips list</h2>

<div>
  {#each useTripListStore.tripsAll as trip (trip._id)}
    <a href={resolve(`/debug/${trip._id}`)}>
      <Card outline class="TripCard">
        <h4>{trip.name}</h4>
        <p>Currency: {trip.currency}</p>
        <p>Archived: {trip.archived ? 'Yes' : 'No'}</p>
        <p>Created at: {createDate(trip.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>
        <p>Updated at: {createDate(trip.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</p>
      </Card>
    </a>
  {/each}
</div>

<style lang="scss">
  h4,
  p {
    margin-top: 0;
    margin-bottom: 6px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  div {
    :global(.TripCard) {
      padding: var(--dodo-ui-space);
    }
  }
</style>
