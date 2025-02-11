<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import DateInput from '$lib/components/ui-framework/Form/DateInput.svelte';
  import NumberInput from '$lib/components/ui-framework/Form/NumberInput.svelte';
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import FormLabel from '$lib/components/ui-framework/Form/shared/FormLabel.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import TimeInput from '$lib/components/ui-framework/Form/TimeInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { categoryOptions, useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { Category } from '$lib/stores/expense/types';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import { PaymentModes } from '$lib/stores/payment-mode/types';

  interface Props {
    expenseId?: string;
  }

  const tripId = page.params.id;

  const { expenseId }: Props = $props();

  let name = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.name || '');
  let amount = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.amount || 0);
  // let description = $state(
  //   useExpenseStore.data.find((item) => item._id === expenseId)?.description || '',
  // );

  let paymentMode: PaymentModes | undefined = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.paymentMode || PaymentModes.CASH,
  );

  let category = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.category || undefined,
  );

  let date = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.date
      ? getMoment(useExpenseStore.data.find((item) => item._id === expenseId)?.date).format(
          'YYYY-MM-DD',
        )
      : getMoment().format('YYYY-MM-DD'),
  );
  let time = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.date
      ? getMoment(useExpenseStore.data.find((item) => item._id === expenseId)?.date).format('HH:mm')
      : getMoment().format('HH:mm'),
  );

  let budgetId = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.budgetId || undefined,
  );

  const budgets = $derived(useBudgetStore.data.filter((item) => item.tripId === tripId));

  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === budgetId));

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'name':
        name = target.value;
        break;
      // case 'description':
      //   description = target.value;
      //   break;
      case 'amount':
        amount = target.valueAsNumber;
        break;
      case 'date':
        date = target.value;
        break;
      case 'time':
        time = target.value;
        break;
      case 'paymentMode':
        paymentMode = target.value as PaymentModes;
        break;
      case 'category':
        if (target.value) {
          category = target.value as Category;
        } else {
          category = undefined;
        }

        break;
      case 'budget':
        if (target.value) {
          budgetId = target.value;
          paymentMode = undefined;
        } else {
          budgetId = undefined;
          if (!paymentMode) {
            paymentMode = PaymentModes.CASH;
          }
        }

        break;
      default:
        break;
    }
  }

  function onsubmit(e: Event) {
    e.preventDefault();

    if (!name.trim() || !date || !time) {
      return;
    }

    const formattedDate = getMoment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').valueOf();

    if (expenseId) {
      console.log(budgetId);

      useExpenseStore.update(
        expenseId,
        name,
        amount || 0,
        formattedDate,
        category,
        budgetId,
        paymentMode,
      );

      goto(`/trips/${tripId}/expense/${expenseId}/`);
    } else {
      useExpenseStore.add(
        tripId,
        name,
        amount || 0,
        formattedDate,
        category,
        budgetId,
        paymentMode,
      );

      goto(`/trips/${tripId}/`);
    }
  }

  function ondelete(e: Event) {
    e.preventDefault();

    if (!expenseId) {
      return;
    }

    useExpenseStore.delete(expenseId);

    goto(`/trips/${tripId}/`);
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
      <DateInput label="Date" value={date} {oninput} name="date" />
    </StackItem>
    <StackItem>
      <TimeInput label="Time" {oninput} name="time" value={time} />
    </StackItem>
    <StackItem>
      <Select label="Category" name="category" onchange={oninput}>
        {#each categoryOptions as categoryOption}
          <option value={categoryOption.value} selected={category === categoryOption.value}>
            {categoryOption.logo}
            {categoryOption.label}
          </option>
        {/each}
      </Select>
    </StackItem>
    <StackItem>
      <Select label="Budget" name="budget" onchange={oninput}>
        <option value={undefined} selected={category === undefined}>Not Selected</option>
        {#each budgets as budget}
          <option value={budget._id} selected={budget._id === budgetId}>{budget.name}</option>
        {/each}
      </Select>
    </StackItem>

    <StackItem>
      {#if targetBudget}
        <div>
          <FormLabel label="Payment mode" />
          {paymentModeOptions.find((item) => item.value === targetBudget.paymentMode)?.label}
        </div>
      {:else}
        <Select label="Payment mode" name="paymentMode" onchange={oninput}>
          {#each paymentModeOptions as paymentModeOption}
            <option
              value={paymentModeOption.value}
              selected={paymentMode === paymentModeOption.value}
            >
              {paymentModeOption.label}
            </option>
          {/each}
        </Select>
      {/if}
    </StackItem>

    <StackItem>
      <Button type="submit" disabled={!name.trim() || !date || !time}>Save</Button>
    </StackItem>

    {#if expenseId}
      <StackItem></StackItem>
      <StackItem>
        <Button variant="danger" onclick={ondelete}>Delete expense</Button>
      </StackItem>
    {/if}
  </Stack>
</form>

<style lang="scss">
</style>
