<script lang="ts">
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import { Money } from '@flightlesslabs/dodo-ui';

  type Props = {
    locale: string;
    value?: number;
    currency: CurrencyCode;
  };

  const { value, currency, locale }: Props = $props();
</script>

<Money {value} {currency} {locale} />
