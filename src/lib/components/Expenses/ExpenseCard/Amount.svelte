<script lang="ts">
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  type Props = {
    value: number;
  };

  let { value }: Props = $props();
</script>

<p class="Amount">
  <Threshold {value} threshold={0} colorMap={{ above: 'default' }}>
    <Money {value} currency="INR" options={{ maximumFractionDigits: 2 }} />
  </Threshold>
</p>

<style lang="scss">
  .Amount {
    margin: 0;
    font-weight: 500;
    color: var(--dodo-color-neutral-800);
  }
</style>
