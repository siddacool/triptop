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
  <FormattedNumber
    {value}
    options={{ style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }}
  />
</div>

<style lang="scss">
  .PercentValue {
    font-size: 0.9rem;
    font-weight: 400;
    width: 1%; /* Shrinks to minimum required width */
    white-space: nowrap; /* Prevent wrapping if desired */
    padding: var(--dodo-ui-space);
    padding-left: 0;
    display: table-cell;
    color: var(--dodo-color-neutral-600);
  }
</style>
