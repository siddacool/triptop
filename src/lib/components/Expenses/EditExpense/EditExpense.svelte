<script lang="ts" module>
  import { type EditExpenseFormData, type Expense } from '$lib/stores/expense/types';

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
  import { parseDate, type DateValue } from '@internationalized/date';
  import { createDate } from '@flightlesslabs/time-utils';
  import { DatePicker } from '@flightlesslabs/dodo-ui-date';
  import { type Trip } from '$lib/stores/trip/types';
  import { Category } from '$lib/stores/category/types';
  import CategorySelect from '$lib/components/ui/Category/CategorySelect/CategorySelect.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { dateFormatOptions } from '$lib/stores/settings/date-format/types';
  import Amount from './Amount.svelte';

  const { mode, data, onsubmit, disabled = false, trip }: EditExpenseProps = $props();

  let name = $derived(data?.name);
  let amount = $derived(data?.amount || null);
  let category: Category = $derived(data?.category || Category.OTHER);
  let date = $derived<DateValue>(parseDate(createDate(data?.date).format('YYYY-MM-DD')));
  const dateFormat = $derived(
    dateFormatOptions.find((item) => item.value === useSettingsStore.settings.dateFormat)
      ?.valueDatePickerFormat,
  );

  const isDataValid = $derived(name && category && date ? true : false);

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
    } as EditExpenseFormData;

    onsubmit?.(data);
  }

  function reset() {
    name = data?.name;
    amount = data?.amount || null;
    category = data?.category || Category.OTHER;
    date = parseDate(createDate(data?.date).format('YYYY-MM-DD'));
  }
</script>

<div class="EditExpense">
  <form onsubmit={submit}>
    <Card outline shadow={0} class="EditExpenseCard">
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
    </Card>
  </form>
</div>

<style>
  .EditExpense {
    color: var(--dodo-color-neutral-800);
    margin-top: calc(var(--dodo-ui-space) * 2);

    :global(.EditExpenseCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
