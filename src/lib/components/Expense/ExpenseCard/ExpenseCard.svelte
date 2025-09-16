<script lang="ts">
  import { resolve } from '$app/paths';
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import PaymentModeIcon from '$lib/components/PaymentModeIcon.svelte';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import { getMoment } from '@flightlesslabs/utils';

  interface ExpenseCardProps {
    data: Expense;
  }

  const { data }: ExpenseCardProps = $props();

  const resolved = resolve(`/${data.tripId}/${data._id}`);
</script>

<a class="ExpenseCard" href={resolved}>
  <Card interactive>
    <p>
      <span class="name">
        <CategoryIcon category={data.category} />
        {data.name}
      </span>

      <b>
        <FormattedCurrency value={data.amount} currency={data.currency} />
        <PaymentModeIcon paymentMode={data.paymentMode} />
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
      margin-bottom: 4px;
      font-size: 1rem;
      letter-spacing: 0.4px;
      display: flex;
      justify-content: space-between;

      b {
        font-weight: 400;
        color: var(--dodo-color-primary-800);
      }

      .name {
        font-family: 'Epunda Sans', sans-serif;
        letter-spacing: 1.1px;
        font-weight: 500;
        font-style: italic;
        display: inline-block;
      }

      :global(.CategoryIcon) {
        vertical-align: middle;
      }

      :global(.PaymentModeIcon) {
        vertical-align: middle;
      }
    }

    .time {
      font-size: 0.85rem;
      font-weight: 300;
      color: var(--dodo-color-neutral-700);
    }
  }
</style>
