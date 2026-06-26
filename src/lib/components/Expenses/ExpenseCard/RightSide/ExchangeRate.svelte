<script lang="ts">
  import SecondaryCurrency from '$lib/components/ui/SecondaryCurrency/SecondaryCurrency.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(
    ['ExpenseCardExchangeRate', expense.archived ? 'archived' : ''].filter(Boolean),
  );
</script>

{#if useSettingsStore.settings.enableCurrencyConversion}
  <SecondaryCurrency
    class={classes.join(' ')}
    value={expense.virtualData?.amountHomeCurrency}
    currency={useSettingsStore.settings.homeCurrency}
    locale={useSettingsStore.settings.locale}
  />
{/if}

<style lang="scss">
  :global(.ExpenseCardExchangeRate.SecondaryCurrency) {
    &.archived {
      text-decoration: line-through;
    }

    margin-top: var(--dodo-ui-space);
    font-size: 0.85rem;
  }
</style>
