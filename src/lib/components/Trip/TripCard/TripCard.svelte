<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Trip } from '$lib/stores/trip/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import SpecialText from '$lib/ui-lib/SpecialText/SpecialText.svelte';

  interface TripCardProps {
    data: Trip;
  }

  const { data }: TripCardProps = $props();

  const resolved = resolve(`/${data._id}`);
</script>

<a class="TripListCard" href={resolved}>
  <Card interactive>
    <p>
      <SpecialText italic fontWeight={500} width={110}>
        {data.name}
      </SpecialText>
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
    }

    :global(.Card) {
      min-height: 60px;
    }
  }
</style>
