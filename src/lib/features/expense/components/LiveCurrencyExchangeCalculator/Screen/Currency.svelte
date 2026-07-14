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
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--dodo-color-neutral-500);
    position: absolute;
    top: calc(var(--dodo-ui-space) * 2);
    left: calc(var(--dodo-ui-space) * 2);
  }
</style>
