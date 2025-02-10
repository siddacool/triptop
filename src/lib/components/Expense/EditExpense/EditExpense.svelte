<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import DateInput from '$lib/components/ui-framework/Form/DateInput.svelte';
  import NumberInput from '$lib/components/ui-framework/Form/NumberInput.svelte';
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import TimeInput from '$lib/components/ui-framework/Form/TimeInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { newDateStringToYearMonthDay } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { Category } from '$lib/stores/expense/types';
  import { PaymentModes } from '$lib/stores/payment-mode/types';

  interface Props {
    expenseId?: string;
  }

  const tripId = page.params.id;

  const { expenseId }: Props = $props();

  let name = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.name || '');
  let amount = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.amount || 0);
  let description = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.description || '',
  );
  let date: Date | null = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.date || null,
  );
  let time: string = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.time || '',
  );
  let paymentMode = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.paymentMode || PaymentModes.CASH,
  );
  let category = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.category || undefined,
  );
  const dateString = $derived(newDateStringToYearMonthDay(date));

  let budgetId = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.budgetId || undefined,
  );

  const budgets = $derived(useBudgetStore.data.filter((item) => item.tripId === tripId));

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'name':
        name = target.value;
        break;
      case 'description':
        description = target.value;
        break;
      case 'amount':
        amount = target.valueAsNumber;
        break;
      case 'date':
        date = target.valueAsDate;
        break;
      case 'time':
        time = target.value;
        break;
      case 'paymentMode':
        paymentMode = target.value as PaymentModes;
        break;
      case 'category':
        category = target.value as Category;

        break;
      default:
        break;
    }
  }

  function onsubmit(e: Event) {
    e.preventDefault();

    if (!name.trim() || !date || !amount || !time) {
      return;
    }

    if (expenseId) {
      useExpenseStore.update(expenseId, name, amount, time, date, category, budgetId, paymentMode);

      goto(`/trips/${tripId}/expense/${expenseId}/`);
    } else {
      useExpenseStore.add(tripId, name, amount, time, date, category, budgetId, paymentMode);

      goto(`/trips/${tripId}/`);
    }
  }
</script>

<form {onsubmit}>
  <Stack space={2}>
    <StackItem>
      <NumberInput label="Amount" value={amount} {oninput} name="amount" placeholder="Add amount" />
    </StackItem>
    <StackItem>
      <TextInput label="Title" value={name} {oninput} name="name" placeholder="Title" />
    </StackItem>
    <!-- <StackItem>
      <TextArea label="Description" value={description} {oninput} name="description" />
    </StackItem> -->
    <StackItem>
      <DateInput label="Date" value={dateString} {oninput} name="date" />
    </StackItem>
    <StackItem>
      <TimeInput label="Time" {oninput} name="time" value={time} />
    </StackItem>
    <StackItem>
      <Select label="Category" name="category" onchange={oninput}>
        <option value={Category.FOOD} selected={category === Category.FOOD}>Food</option>
        <option value={Category.SHOPPING} selected={category === Category.SHOPPING}
          >Shopping
        </option>
        <option value={Category.TOUR} selected={category === Category.TOUR}>Tour</option>
        <option value={Category.TRANSPORT} selected={category === Category.TRANSPORT}
          >Transport</option
        >
        <option value={Category.STAY} selected={category === Category.STAY}>Stay</option>
        <option value={Category.FLIGHT} selected={category === Category.FLIGHT}>Flight</option>
        <option value={Category.STAY} selected={category === Category.STAY}>Stay</option>
        <option value={Category.ENTERTAINMENT} selected={category === Category.ENTERTAINMENT}>
          Entertainment
        </option>
        <option value={Category.MART} selected={category === Category.MART}>Mart</option>
        <option value={undefined} selected={category === undefined}>Other</option>
      </Select>
    </StackItem>
    <StackItem>
      <Select label="Budget" name="budget" onchange={oninput}>
        {#each budgets as budget}
          <option value={budget} selected={budget._id === budgetId}>{budget.name}</option>
        {/each}
        <option value={undefined} selected={category === undefined}>Not Selected</option>
      </Select>
    </StackItem>
    <StackItem>
      <Select label="Payment mode" name="paymentMode" onchange={oninput}>
        <option value={PaymentModes.CASH} selected={paymentMode === PaymentModes.CASH}>Cash</option>
        <option value={PaymentModes.CARD} selected={paymentMode === PaymentModes.CARD}>Card</option>
      </Select>
    </StackItem>
    <StackItem>
      <Button type="submit" disabled={!name.trim() || !date || !amount || !time}>Save</Button>
    </StackItem>
  </Stack>
</form>

<style lang="scss">
</style>
