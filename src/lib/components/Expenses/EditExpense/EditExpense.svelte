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
    currency: CurrencyCode;
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
  import { Card, Column, FormField, Grid, TextInput } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls.svelte';
  import { NumericInput } from '@flightlesslabs/dodo-ui-numeric';
  import { NumberFormatStyle } from 'svelte-number-format';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { parseDate, type DateValue } from '@internationalized/date';
  import { createDate } from '@flightlesslabs/time-utils';
  import { DatePicker } from '@flightlesslabs/dodo-ui-date';
  import type { CurrencyCode } from '@flightlesslabs/currency';

  const { mode, data, onsubmit, disabled = false, currency }: EditExpenseProps = $props();

  let name = $derived(data?.name);
  let amount = $derived(data?.amount || 0);
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
      amount: amount || 0,
      paymentMode: paymentMode || PaymentModes.CASH,
      category: category || Category.OTHER,
      date: date.toString(),
    } as EditExpenseFormData;

    onsubmit?.(data);
  }

  function reset() {
    name = data?.name;
    amount = data?.amount || 0;
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
          <FormField label="Title:" for="name">
            <TextInput bind:value={name} name="name" {disabled} />
          </FormField>
        </Column>

        <Column>
          <FormField label="Amount:" for="amount">
            <NumericInput
              bind:value={amount}
              name="amount"
              {disabled}
              options={{
                formatStyle: NumberFormatStyle.Currency,
                currency,
                precision: 2,
              }}
            />
          </FormField>
        </Column>

        <Column>
          <FormField label="Payment mode:" for="paymentMode">
            <Select options={paymentModesOptions} bind:value={paymentMode} name="paymentMode" />
          </FormField>
        </Column>

        <Column>
          <FormField label="Category:" for="category">
            <Select options={categoryOptions} bind:value={category} name="category" searchable />
          </FormField>
        </Column>

        <Column>
          <FormField label="Date:">
            <DatePicker bind:value={date} />
          </FormField>
        </Column>

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
