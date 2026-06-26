<script lang="ts">
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import { Money } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    locale: string;
    value?: number;
    currency: CurrencyCode;
  };

  const { class: className = '', value, currency, locale }: Props = $props();

  const classes = $derived(['SecondaryCurrency', className].filter(Boolean));
</script>

{#if value || value === 0}
  <div class={classes.join(' ')}>
    <Money {value} {currency} {locale} />
  </div>
{/if}

<style lang="scss">
  .SecondaryCurrency {
    display: inline-flex;
    font-size: inherit;
    color: var(--dodo-color-secondary-500);
  }

  :global(.dodo-theme--dark .SecondaryCurrency) {
    color: var(--dodo-color-secondary-600);
  }
</style>
