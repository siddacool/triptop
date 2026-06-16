<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Trip } from '$lib/stores/trip/types';
  import { Card, type CardColor, type ComponentShadow } from '@flightlesslabs/dodo-ui';
  import Title from './Title.svelte';
  import Date from './Date.svelte';

  type Props = {
    trip: Trip;
  };

  let { trip }: Props = $props();
  let cardColor = $state<CardColor>('default');

  function handleOnHover() {
    cardColor = 'primary';
  }

  function handleOnBlur() {
    cardColor = 'default';
  }
</script>

<li
  class="TripListItem"
  onmouseover={handleOnHover}
  onfocus={handleOnHover}
  onmouseout={handleOnBlur}
  onblur={handleOnBlur}
>
  <a href={resolve(`/trips/${trip._id}`)}>
    <Card class="TripListItemCard" roundness={2} active color={cardColor}>
      <div class="info">
        <Title>{trip.name}</Title>
      </div>
      <Date date={trip.updatedAt} />
    </Card>
  </a>
</li>

<style lang="scss">
  .TripListItem {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin-bottom: var(--dodo-ui-space);

    :global(.TripListItemCard) {
      padding: calc(var(--dodo-ui-space) * 2);
      width: 100%;
    }

    a {
      color: var(--dodo-color-neutral-800);
      text-decoration: none;
      display: flex;
      flex-direction: column;
    }

    p {
      margin: 0;
    }
  }
</style>
