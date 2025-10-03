<script lang="ts">
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import PaymentModeIcon from '$lib/components/PaymentModeIcon.svelte';
  import { type Expense } from '$lib/stores/expense/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import { getMoment } from '@flightlesslabs/utils';
  import Icon from '@iconify/svelte';
  import Tags from './Tags.svelte';

  interface ExpenseDetailsProps {
    data: Expense;
  }

  const { data }: ExpenseDetailsProps = $props();
</script>

<div class="ExpenseDetails">
  <Card>
    <Grid spacing={3}>
      <Column>
        <div class="name creativeFont">
          <CategoryIcon category={data.category} />
          {data.name}
        </div>
      </Column>
      <Column>
        <div class="currency">
          <PaymentModeIcon paymentMode={data.paymentMode} />
          <FormattedCurrency value={data.amount} currency={data.currency} />
        </div>
      </Column>
      <Column>
        <div class="date">
          <Icon icon="material-symbols:calendar-month-rounded" width="20" height="20" />
          {getMoment(data.date).format('ddd, MMM D, YYYY')}
        </div>
      </Column>
      <Column>
        <div class="date">
          <Icon icon="tabler:clock-filled" width="20" height="20" />
          {getMoment(data.date).format('h:mm a')}
        </div>
      </Column>
      <Tags {data} />
    </Grid>
  </Card>
</div>

<style lang="scss">
  .ExpenseDetails {
    margin-top: 24px;

    .name {
      font-size: 1.75rem;
      font-weight: 400;

      :global(.CategoryIcon) {
        vertical-align: middle;
        transform: scale(1.4);
      }
    }

    .currency {
      font-size: 1.5rem;
      font-weight: 400;
      letter-spacing: 0.4px;

      :global(.PaymentModeIcon) {
        vertical-align: middle;
        transform: scale(1.2);
      }
    }

    .date {
      display: flex;
      align-items: center;
      font-size: 1rem;

      :global(svg) {
        display: inline-flex;
        margin-right: 4px;
      }
    }
  }
</style>
