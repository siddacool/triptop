<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';
  import type { Trip } from '$lib/stores/trip/types';

  type Props = {
    expense: Expense;
    trip: Trip;
  };

  let { expense, trip }: Props = $props();

  import Amount from './Amount.svelte';
  import ExchangeRate from './ExchangeRate.svelte';
  import MetaData from './MetaData.svelte';
</script>

<div class="RightSide">
  <Amount {expense} {trip} />
  <ExchangeRate {expense} />
  <MetaData {expense} />
</div>

<style lang="scss">
  .RightSide {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
</style>
