<script lang="ts">
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import { Card } from '@flightlesslabs/dodo-ui';
  import Amount from './Amount.svelte';
  import Currency from './Currency.svelte';

  type Props = {
    class?: string;
    currency: CurrencyCode;
    amount: number;
    locale: string | undefined;
  };

  const { class: className = '', currency, amount, locale }: Props = $props();

  const classes = $derived(['Screen', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="ScreenCard" shadow={0} outline>
    <Currency {currency} />
    <Amount value={amount} {locale} {currency} />
  </Card>
</div>

<style>
  .Screen {
    margin: calc(var(--dodo-ui-space) * 2) 0;

    :global(.ScreenCard) {
      padding: calc(var(--dodo-ui-space) * 2);
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      overflow: hidden;
      color: var(--dodo-color-neutral-800);
      position: relative;
    }
  }
</style>
