<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Trip } from '$lib/stores/trip/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';

  interface TripCardProps {
    data: Trip;
  }

  const { data }: TripCardProps = $props();

  const resolved = resolve(`/${data._id}`);
</script>

<a class="TripListCard" href={resolved}>
  <Card interactive>
    <p class="creativeFont">
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
      margin: 0;
      font-size: 1.2rem;
      letter-spacing: 1.4px;
      font-weight: 500;
      font-style: italic;
    }

    :global(.Card) {
      min-height: 60px;
    }
  }
</style>
