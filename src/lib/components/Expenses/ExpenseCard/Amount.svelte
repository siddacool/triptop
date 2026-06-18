<script lang="ts">
  import { DEFAULT_LOCALE, type Trip } from '$lib/stores/trip/types';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  type Props = {
    value: number;
    trip: Trip;
  };

  let { value, trip }: Props = $props();
</script>

<p class="Amount">
  <Threshold {value} threshold={0} colorMap={{ above: 'default' }}>
    <Money
      {value}
      currency={trip.currency}
      locale={trip.locale || DEFAULT_LOCALE}
      options={{ maximumFractionDigits: 2 }}
    />
  </Threshold>
</p>

<style lang="scss">
  .Amount {
    margin: 0;
    font-weight: 500;
    color: var(--dodo-color-neutral-800);
  }
</style>
