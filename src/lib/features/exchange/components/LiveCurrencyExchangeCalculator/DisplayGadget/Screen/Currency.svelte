<script lang="ts">
  import type { CurrencyCode } from '@flightlesslabs/currency';

  type Props = {
    class?: string;
    currency: CurrencyCode;
  };

  const { class: className = '', currency }: Props = $props();

  const classes = $derived(['Currency', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {currency}
</div>

<style>
  .Currency {
    font-size: 1rem;
    font-weight: 500;
    color: var(--dodo-color-neutral-600);
    position: absolute;
    top: calc(var(--dodo-ui-space) * 1);
    left: calc(var(--dodo-ui-space) * 1);
  }
</style>
