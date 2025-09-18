<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  interface FormattedCurrencyProps {
    value: number;
    class?: string;
    currency?: string;
  }

  const { value, class: className = '', currency }: FormattedCurrencyProps = $props();

  const isNegative = $derived(value < 0);

  const formattedValue = $derived(
    currency
      ? new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
          style: 'currency',
          currency: currency,
        }).format(value)
      : value,
  );

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<span class={['FormattedCurrency', theme, className].join(' ')} class:isNegative
  >{formattedValue}</span
>

<style lang="scss">
  .FormattedCurrency {
    display: inline-flex;
    font-family: inherit;
    color: inherit;

    &.isNegative {
      color: var(--dodo-color-danger-600);
    }

    &.theme {
      &--dark {
        &.isNegative {
          color: var(--dodo-color-danger-700);
        }
      }
    }
  }
</style>
