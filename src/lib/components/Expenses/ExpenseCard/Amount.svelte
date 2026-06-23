<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { type Trip } from '$lib/stores/trip/types';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  type Props = {
    trip: Trip;
    expense: Expense;
  };

  let { trip, expense }: Props = $props();

  const locale = $derived(trip.locale || useSettingsStore.settings.locale);

  const classes = $derived(['Amount', expense.archived ? 'archived' : ''].filter(Boolean));
</script>

<p class={classes.join(' ')}>
  <Threshold value={expense.amount} threshold={0} colorMap={{ above: 'default' }}>
    <Money
      value={expense.amount}
      currency={trip.currency}
      {locale}
      options={{ maximumFractionDigits: 2 }}
    />
  </Threshold>
</p>

<style lang="scss">
  .Amount {
    margin: 0;

    &.archived {
      text-decoration: line-through;
    }

    :global(.dodo-ui-Text) {
      color: var(--dodo-color-neutral-800);
    }
  }
</style>
