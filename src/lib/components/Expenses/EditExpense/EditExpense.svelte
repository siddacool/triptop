<script lang="ts" module>
  import {
    Category,
    categoryOptions,
    PaymentModes,
    paymentModesOptions,
    type EditExpenseFormData,
    type Expense,
  } from '$lib/stores/expense/types';

  type EditExpenseBaseProps = {
    onsubmit?: (data: EditExpenseFormData) => void;
    disabled?: boolean;
    trip: Trip;
  };

  export type EditExpenseProps =
    | (EditExpenseBaseProps & {
        mode: 'edit';
        data: Expense;
      })
    | (EditExpenseBaseProps & {
        mode: 'create';
        data?: undefined;
      });
</script>

<script lang="ts">
  import { Card, Column, FormField, Grid, Row, TextArea } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls.svelte';
  import { NumericInput } from '@flightlesslabs/dodo-ui-numeric';
  import { NumberFormatStyle } from 'svelte-number-format';
  import { Select, ToggleGroup } from '@flightlesslabs/dodo-ui-bits';
  import { parseDate, type DateValue } from '@internationalized/date';
  import { createDate } from '@flightlesslabs/time-utils';
  import { DatePicker } from '@flightlesslabs/dodo-ui-date';
  import type { Trip } from '$lib/stores/trip/types';

  const { mode, data, onsubmit, disabled = false, trip }: EditExpenseProps = $props();

  let name = $derived(data?.name);
  let amount = $derived(data?.amount || null);
  let paymentMode: PaymentModes = $derived(data?.paymentMode || PaymentModes.CASH);
  let category: Category = $derived(data?.category || Category.OTHER);
  let date = $derived<DateValue>(parseDate(createDate(data?.date).format('YYYY-MM-DD')));

  const isDataValid = $derived(name && category && paymentMode && date ? true : false);

  function submit(event: SubmitEvent) {
    event.preventDefault();

    if (!isDataValid) {
      return;
    }

    const data = {
      name,
      amount,
      paymentMode: paymentMode || PaymentModes.CASH,
      category: category || Category.OTHER,
      date: date.toString(),
    } as EditExpenseFormData;

    onsubmit?.(data);
  }

  function reset() {
    name = data?.name;
    amount = data?.amount || null;
    paymentMode = data?.paymentMode || PaymentModes.CASH;
    category = data?.category || Category.OTHER;
    date = parseDate(createDate(data?.date).format('YYYY-MM-DD'));
  }
</script>

<div class="EditExpense">
  <form onsubmit={submit}>
    <Card outline shadow={0} class="EditExpenseCard">
      <Grid gap={2}>
        <Column>
          <FormField label="Amount:" for="amount">
            <NumericInput
              bind:value={amount}
              name="amount"
              {disabled}
              locale={trip.locale}
              options={{
                formatStyle: NumberFormatStyle.Currency,
                currency: trip.currency,
                precision: 2,
              }}
              size="large"
              placeholder="0.00"
            />
          </FormField>
        </Column>

        <Column>
          <FormField label="Description:" for="name">
            <TextArea bind:value={name} name="name" {disabled} placeholder="e.g. Dinner at Koko" />
          </FormField>
        </Column>

        <Row>
          <Column lg="flex">
            <FormField label="Date:">
              <DatePicker bind:value={date} />
            </FormField>
          </Column>

          <Column lg="flex" size="flex">
            <FormField label="Category:" for="category">
              <Select options={categoryOptions} bind:value={category} name="category" searchable />
            </FormField>
          </Column>

          <Column lg={3} size={5}>
            <FormField label="Mode:" for="paymentMode">
              <ToggleGroup
                options={paymentModesOptions}
                type="single"
                bind:value={paymentMode}
                attached
                fullWidth
                flex
                buttonProps={{
                  outline: true,
                  compact: true,
                }}
              />
            </FormField>
          </Column>
        </Row>

        <Column>
          <Controls {mode} {disabled} onreset={reset} {isDataValid} />
        </Column>
      </Grid>
    </Card>
  </form>
</div>

<style>
  .EditExpense {
    color: var(--dodo-color-neutral-800);

    :global(.EditExpenseCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
