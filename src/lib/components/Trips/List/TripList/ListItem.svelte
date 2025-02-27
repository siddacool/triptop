<script lang="ts">
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import type { Trip } from '$lib/stores/trips/types';

  interface Props {
    trip: Trip;
  }

  const { trip }: Props = $props();
</script>

<li class="ListItem">
  <a href={`/${trip._id}`}>
    <Card>
      <Stack space={2}>
        <StackItem><p>{trip.name}</p></StackItem>
        <StackItem>
          <div class="date">
            {getMoment(trip.startDate).format('MMM D')} - {getMoment(trip.endDate).format('MMM D')}
          </div>
        </StackItem>
      </Stack>
    </Card>
  </a>
</li>

<style lang="ts">
  li {
    display: block;
    padding: 0;
    margin: 8px 0;
  }

  a {
    display: block;
    margin: 0;
    padding: 0;
    text-decoration: none;
    color: inherit;

    &:hover {
      :global(.Card) {
        background-color: var(--color-primary-50);
      }
    }

    &:active {
      :global(.Card) {
        background-color: var(--color-primary-100);
      }
    }

    :global(.Card) {
      padding: 20px 20px;
    }
  }

  p {
    font-size: 1.3rem;
    margin: 0;
    font-weight: 500;
  }

  .date {
    font-size: 1rem;
    color: var(--color-grey-font-700);
  }
</style>
