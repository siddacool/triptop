<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import ButtonGroup from '$lib/components/ui-framework/Form/ButtonGroup.svelte';
  import DateInput from '$lib/components/ui-framework/Form/DateInput.svelte';
  import NumberInput from '$lib/components/ui-framework/Form/NumberInput.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import TimeInput from '$lib/components/ui-framework/Form/TimeInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { newDateStringToYearMonthDay } from '$lib/helpers/time';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';

  interface Props {
    expenseId?: string;
  }

  const { expenseId }: Props = $props();

  let name = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.name || '');
  let amount = $state(useExpenseStore.data.find((item) => item._id === expenseId)?.amount || 0);
  let description = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.description || '',
  );
  let date: Date | null = $state(
    useExpenseStore.data.find((item) => item._id === expenseId)?.date || null,
  );
  const dateString = $derived(newDateStringToYearMonthDay(date));

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
      default:
        break;
    }
  }

  function onsubmit(e: Event) {
    e.preventDefault();

    if (!name.trim() || !date || !amount) {
      return;
    }

    goto('/');
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
      <TimeInput label="Time" {oninput} name="time" />
    </StackItem>
    <StackItem>
      <ButtonGroup conjoint label="Payment method">
        <Button>Cash</Button>
        <Button>Card</Button>
      </ButtonGroup>
    </StackItem>
    <StackItem>
      <Button type="submit" disabled={!name.trim() || !amount || !date}>Save</Button>
    </StackItem>
  </Stack>
</form>

<style lang="scss">
</style>
