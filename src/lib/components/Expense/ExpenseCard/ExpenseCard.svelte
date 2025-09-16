<script lang="ts">
  import { resolve } from '$app/paths';
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import { PaymentModes, type Expense } from '$lib/stores/expense/individual.svelte';
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
      </b>
    </p>

    <div class="time">
      {getMoment(data.date).format('h:m a')}
    </div>

    <div
      class={['PaymentModeBar', data.paymentMode === PaymentModes.CARD ? 'CARD' : 'CASH'].join(' ')}
    ></div>
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

    p {
      margin-top: 0;
      margin-bottom: 4px;
      font-size: 1.1rem;
      letter-spacing: 0.4px;
      display: flex;
      justify-content: space-between;

      b {
        font-weight: 400;
        font-size: 1.1rem;
        display: flex;
        flex-direction: column;
      }

      .name {
        font-family: 'Epunda Sans', sans-serif;
        letter-spacing: 1.1px;
        font-weight: 400;
        display: inline-block;
      }

      :global(.CategoryIcon) {
        vertical-align: middle;
      }
    }

    .time {
      font-size: 0.85rem;
      color: var(--dodo-color-neutral-600);
    }

    .PaymentModeBar {
      height: 4px;
      border-radius: 8px;
      opacity: 0.4;
      position: absolute;
      right: 0;
      width: 100px;
      bottom: 0;

      &.CARD {
        background-color: var(--dodo-color-warning-300);
      }

      &.CASH {
        background-color: var(--dodo-color-safe-300);
      }
    }
  }
</style>
