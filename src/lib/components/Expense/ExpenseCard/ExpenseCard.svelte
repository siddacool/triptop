<script lang="ts">
  import { resolve } from '$app/paths';
  import { type Expense } from '$lib/stores/expense/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import MainInfo from './MainInfo.svelte';
  import Time from './Time.svelte';
  import PaymentModeBar from './PaymentModeBar.svelte';

  interface ExpenseCardProps {
    data: Expense;
  }

  const { data }: ExpenseCardProps = $props();

  const resolved = resolve(`/${data.tripId}/${data._id}`);
</script>

<a class="ExpenseCard" href={resolved}>
  <Card interactive>
    <MainInfo {data} />
    <Time date={data.date} />
    <PaymentModeBar paymentMode={data.paymentMode} />
  </Card>
</a>

<style lang="scss">
  .ExpenseCard {
    color: inherit;
    text-decoration: none;

    :global(.Card) {
      padding: 8px 12px;
      overflow: hidden;
      position: relative;
    }
  }
</style>
