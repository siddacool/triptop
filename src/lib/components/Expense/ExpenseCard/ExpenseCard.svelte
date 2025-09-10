<script lang="ts">
  import CurrencyAndAmount from '$lib/components/CurrencyAndAmount.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import { getMoment } from '@flightlesslabs/utils';

  interface ExpenseCardProps {
    data: Expense;
  }

  const { data }: ExpenseCardProps = $props();
</script>

<a class="ExpenseCard" href={`/${data.tripId}/${data._id}`}>
  <Card interactive>
    <p>
      {data.name}

      <b>
        <FormattedCurrency value={data.amount} currency={data.currency} />
      </b>
    </p>

    <div class="time">
      {getMoment(data.date).format('h:m a')}
    </div>
  </Card>
</a>

<style lang="scss">
  .ExpenseCard {
    color: inherit;
    text-decoration: none;

    p {
      margin-top: 0;
      font-size: 1.3rem;
      letter-spacing: 0.4px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      b {
        font-weight: normal;
      }
    }
  }
</style>
