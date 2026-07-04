<script lang="ts">
  import { FormattedNumber } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    value: number;
  };

  let { class: className = '', value }: Props = $props();

  const classes = $derived(['PercentValue', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <FormattedNumber {value} options={{ style: 'percent' }} />
</div>

<style lang="scss">
  .PercentValue {
    font-size: 0.9rem;
    font-weight: 400;
    width: 45px;
  }
</style>
