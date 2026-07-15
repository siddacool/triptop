<script lang="ts">
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import { Card } from '@flightlesslabs/dodo-ui';
  import Amount from './Amount.svelte';
  import Currency from './Currency.svelte';

  type Props = {
    class?: string;
    currency: CurrencyCode;
    amount: number;
    originalAmount: string;
    locale: string | undefined;
    isActive?: boolean;
  };

  const {
    class: className = '',
    currency,
    amount,
    locale,
    originalAmount,
    isActive,
  }: Props = $props();

  const classes = $derived(['Screen', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="ScreenCard" shadow={0} outline>
    <Currency {currency} />
    <Amount value={amount} {locale} {currency} {isActive} {originalAmount} />
  </Card>
</div>

<style>
  .Screen {
    margin: calc(var(--dodo-ui-space) * 2) 0;
    flex: 1;
    min-height: 70px;
    max-height: 150px;

    :global(.ScreenCard) {
      padding: calc(var(--dodo-ui-space) * 1);
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      overflow: hidden;
      color: var(--dodo-color-neutral-800);
      position: relative;

      @media (min-width: 400px) {
        padding: calc(var(--dodo-ui-space) * 2);
      }
    }
  }
</style>
