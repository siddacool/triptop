<script lang="ts" module>
  import { type Expense, type ExpenseUpdateData } from '$lib/features/expense/types';

  type EditExpenseBaseProps = {
    onsubmit?: (data: ExpenseUpdateData, eventSubmitter?: HTMLElement | null) => void;
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
  import { Column, FormField, Grid, Row, TextArea } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls.svelte';
  import { parseDate, type DateValue } from '@internationalized/date';
  import { DatePicker } from '@flightlesslabs/dodo-ui-date';
  import type { Trip } from '$lib/features/trip/types';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import Amount from './Amount.svelte';
  import { createDate } from '$lib/utils/date-time/createDate';
  import { Category } from '../../types/category';
  import CategorySelect from '../Category/CategorySelect/CategorySelect.svelte';
  import { dateFormatOptions } from '$lib/features/settings/config';

  const { mode, data, onsubmit, disabled = false, trip }: EditExpenseProps = $props();

  let name = $derived(data?.name);
  let amount = $derived(data?.amount || null);
  let category: Category = $derived(data?.category || Category.OTHER);
  let date = $derived<DateValue>(parseDate(createDate(data?.date).format('YYYY-MM-DD')));
  const dateFormat = $derived(
    dateFormatOptions.find((item) => item.value === settingsStore.settings.dateFormat)
      ?.valueDatePickerFormat,
  );

  const isDataValid = $derived(name && category && date ? true : false);

  function reset() {
    name = data?.name;
    amount = data?.amount || null;
    category = data?.category || Category.OTHER;
    date = parseDate(createDate(data?.date).format('YYYY-MM-DD'));
  }

  function submit(event: SubmitEvent) {
    event.preventDefault();

    if (!isDataValid) {
      return;
    }

    const eventSubmitter = event.submitter;

    if (!eventSubmitter?.classList.contains('event-submitter')) {
      return;
    }

    const data = {
      name,
      amount,
      category: category || Category.OTHER,
      date: date.toString(),
    } as ExpenseUpdateData;

    onsubmit?.(data, eventSubmitter);

    reset();
  }
</script>

<div class="EditExpense">
  <form onsubmit={submit}>
    <Grid gap={2}>
      <Amount bind:amount {disabled} {trip} />
      <Column>
        <FormField label="Description:" for="name">
          <TextArea bind:value={name} name="name" {disabled} placeholder="e.g. Dinner at Koko" />
        </FormField>
      </Column>

      <Row>
        <Column lg="flex">
          <FormField label="Category:" for="category">
            <CategorySelect name="category" bind:value={category} />
          </FormField>
        </Column>

        <Column lg="flex">
          <FormField label="Date:">
            <DatePicker bind:value={date} {dateFormat} />
          </FormField>
        </Column>
      </Row>

      <Column>
        <Controls {mode} {disabled} onreset={reset} {isDataValid} />
      </Column>
    </Grid>
  </form>
</div>

<style>
  .EditExpense {
    color: var(--dodo-color-neutral-800);
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
