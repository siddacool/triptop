<script lang="ts">
  import { page } from '$app/state';
  import CurrencyAndAmount from '$lib/components/CurrencyAndAmount.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import Header from '$lib/components/Header.svelte';
  import { PaymentModes, type Expense } from '$lib/stores/expense/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import { getMoment } from '@flightlesslabs/utils';

  interface ExpenseDetailsProps {
    data: Expense;
  }

  const { data }: ExpenseDetailsProps = $props();
  const tripId = page.params.tripId;
</script>

<div class="ExpenseDetails">
  <Card>
    <Grid spacing={4}>
      <Column>
        <Header backTo={`/${tripId}`} aria-label="Back to trip">Expense Details</Header>
      </Column>
      <Column>
        <Grid spacing={3}>
          <Column>
            <div class="name">{data.name}</div>
          </Column>
          <Column>
            <div class="currency">
              <FormattedCurrency value={data.amount} currency={data.currency} />
            </div>
          </Column>
          <Column>
            <div class="paymentMode">
              Payment Mode: <br />{data.paymentMode === PaymentModes.CASH ? 'Cash' : 'Card'}
            </div>
          </Column>
          <Column>
            <div class="category">Category: <br />{data.category || 'Other'}</div>
          </Column>
          <Column>
            <div class="date">{getMoment(data.date).format('ddd, MMM D, YYYY')}</div>
          </Column>
        </Grid>
      </Column>
    </Grid>
  </Card>
</div>

<style lang="scss">
  .ExpenseDetails {
    .name {
      font-size: 1.5rem;
    }

    .currency {
      font-size: 1.3rem;
    }

    .paymentMode,
    .category {
      line-height: 30px;
    }
  }
</style>
