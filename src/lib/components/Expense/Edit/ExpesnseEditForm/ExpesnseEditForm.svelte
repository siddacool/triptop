<script lang="ts">
  import PaymentModeSelect from '$lib/components/PaymentMode/PaymentModeSelect.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { Category, ExpenseFormData } from '$lib/stores/expense/types';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { PaymentModes } from '$lib/stores/payment-mode/types';
  import Amount from './Amount.svelte';
  import BudgetSelect from './BudgetSelect/BudgetSelect.svelte';
  import CategorySelect from './CategorySelect.svelte';
  import CurrencySelect from './CurrencySelect.svelte';
  import Date from './Date.svelte';

  interface Props {
    expenseId?: string;
    onSave: (data: ExpenseFormData, clickedButton?: HTMLButtonElement) => Promise<void>;
  }

  const { expenseId, onSave }: Props = $props();

  const lastBudget = $derived(useLocalSettingsStore.lastBudget);

  let name = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.name || '');
  let budgetId = $state(
    expenseId
      ? useExpenseStore.data.find((item) => item._id === expenseId)?.budgetId
      : useBudgetStore.data.find((item) => item._id === lastBudget)?._id,
  );

  let amount = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.amount || 0);
  let currency = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.currency ||
      DEFUALT_CURRENCY.alphabeticCode,
  );
  let category = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.category);
  let paymentMode = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.paymentMode || PaymentModes.CASH,
  );
  let dateDate = $state(
    getMoment(
      useExpenseStore.data.find((item) => item._id === expenseId)?.date || getMoment().valueOf(),
    )
      .startOf('day')
      .format(DateFormats.YEAR_FIRST_STANDARD),
  );
  let dateTime = $state(
    getMoment(
      useExpenseStore.data.find((item) => item._id === expenseId)?.date || getMoment().valueOf(),
    ).format('HH:mm'),
  );
  let loading = $state(false);
  const disabled = $derived(!name || !dateDate || !dateTime || loading);

  function oninput(e: Event) {
    const element = e.target as HTMLInputElement;

    switch (element.name) {
      case 'name':
        name = element.value;
        break;
      case 'budgetId':
        budgetId = element.value;

        break;
      case 'amount':
        amount = element.valueAsNumber;
        break;
      case 'category':
        category = element.value as Category;
        break;
      case 'currency':
        currency = element.value;
        break;
      case 'paymentMode':
        paymentMode = element.value as PaymentModes;
        break;
      case 'date_date':
        dateDate = element.value;
        break;
      case 'date_time':
        dateTime = element.value;
        break;
      default:
        break;
    }
  }

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();

      if (disabled) {
        return;
      }

      loading = true;

      const clickedButton = e.submitter as HTMLButtonElement;

      const date = getMoment(`${dateDate} ${dateTime}`, 'YYYY-MM-DD HH:mm').valueOf();

      useLocalSettingsStore.updateLastBudget(budgetId);

      await onSave(
        {
          name,
          budgetId,
          amount,
          category,
          currency,
          paymentMode,
          date,
        },
        clickedButton,
      );

      name = '';
      amount = 0;
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
    }
  }
</script>

<StackItem>
  <form {onsubmit}>
    <Stack space={2}>
      <StackItem>
        <TextInput
          value={name}
          {oninput}
          name="name"
          label="Enter expense name"
          placeholder="Lunch, Dinner, train to somewhere"
        />
      </StackItem>

      <BudgetSelect onchange={oninput} value={budgetId} {amount} {expenseId} />

      {#if !budgetId}
        <CurrencySelect onchange={oninput} value={currency} />
        <PaymentModeSelect value={paymentMode} onchange={oninput} />
      {/if}

      <Amount {oninput} value={amount} />
      <CategorySelect value={category} onchange={oninput} />
      <Date {dateDate} {dateTime} {oninput} />
      <StackItem></StackItem>
      <StackItem>
        <Button type="submit" variant="safe" {disabled}>Save</Button>

        {#if !expenseId}
          <Button
            type="submit"
            variant="safe"
            {disabled}
            name="save-and-add-new"
            class="saveAndAddNew"
          >
            Save and add new
          </Button>
        {/if}
      </StackItem>
    </Stack>
  </form>
</StackItem>

<style lang="scss">
  form {
    :global(.saveAndAddNew) {
      margin-left: 8px;
    }
  }
</style>
