<script lang="ts">
  import type { Trip } from '$lib/stores/trip/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';

  interface TripCardProps {
    data: Trip;
  }

  const { data }: TripCardProps = $props();
</script>

<a class="TripListCard" href={`/${data._id}`}>
  <Card interactive>
    <p>
      {data.name}
    </p>
  </Card>
</a>

<style lang="scss">
  .TripListCard {
    color: inherit;
    text-decoration: none;
    display: block;

    p {
      font-family: 'Epunda Sans', sans-serif;
      margin: 0;
      font-size: 1.7rem;
      letter-spacing: 1.4px;
      font-weight: 500;
      font-style: italic;
    }

    :global(.Card) {
      min-height: 100px;
    }
  }
</style>
