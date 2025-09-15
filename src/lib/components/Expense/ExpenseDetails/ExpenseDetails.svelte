<script lang="ts">
  import { page } from '$app/state';
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import CurrencyAndAmount from '$lib/components/CurrencyAndAmount.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import Header from '$lib/components/Header.svelte';
  import PaymentModeIcon from '$lib/components/PaymentModeIcon.svelte';
  import { PaymentModes, type Expense } from '$lib/stores/expense/individual.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import { getMoment } from '@flightlesslabs/utils';
  import Icon from '@iconify/svelte';

  interface ExpenseDetailsProps {
    data: Expense;
  }

  const { data }: ExpenseDetailsProps = $props();
  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;
</script>

<div class="ExpenseDetails">
  <Card>
    <Grid spacing={4}>
      <Column>
        <Header backTo={`/${tripId}`} aria-label="Back to trip">
          Expense Details {#snippet after()}
            <Button
              href={`/${tripId}/${expenseId}/edit`}
              aria-label="Edit Expense"
              compact
              class="EditExpense"
            >
              <Icon icon="material-symbols:edit" />
            </Button>
          {/snippet}
        </Header>
      </Column>
      <Column>
        <Grid spacing={3}>
          <Column>
            <div class="name"><CategoryIcon category={data.category} /> {data.name}</div>
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
              <Icon icon="tabler:clock-filled" width="20" height="20" />
              {getMoment(data.date).format('h:m A')}
            </div>
          </Column>
        </Grid>
      </Column>
    </Grid>
  </Card>
</div>

<style lang="scss">
  .ExpenseDetails {
    .name {
      font-size: 1.3rem;
      font-family: 'Epunda Sans', sans-serif;
      letter-spacing: 1.4px;
      font-weight: 700;
      font-style: italic;

      :global(.CategoryIcon) {
        vertical-align: middle;
      }
    }

    .currency {
      font-size: 1.3rem;
      font-weight: 500;
      color: var(--dodo-color-primary-700);

      :global(.PaymentModeIcon) {
        vertical-align: middle;
      }
    }

    .date {
      display: flex;
      align-items: center;

      :global(svg) {
        display: inline-flex;
        margin: 0 4px;
      }
    }
  }
</style>
