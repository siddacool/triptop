<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import NumberInput from '$lib/components/ui-framework/Form/NumberInput.svelte';
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { PaymentModes } from '$lib/stores/payment-mode/types';

  interface Props {
    budgetId?: string;
  }

  const tripId = page.params.id;

  const { budgetId }: Props = $props();

  let name = $state(useBudgetStore.data.find((item) => item._id === budgetId)?.name || '');
  let amount = $state(useBudgetStore.data.find((item) => item._id === budgetId)?.amount || 0);
  let paymentMode = $state(
    useBudgetStore.data.find((item) => item._id === budgetId)?.paymentMode || PaymentModes.CASH,
  );

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'name':
        name = target.value;
        break;
      case 'amount':
        amount = target.valueAsNumber;
        break;
      case 'paymentMode':
        paymentMode = target.value as PaymentModes;
        break;
      default:
        break;
    }
  }

  function onsubmit(e: Event) {
    e.preventDefault();

    if (!name.trim() || !amount || !paymentMode) {
      return;
    }

    if (budgetId) {
      useBudgetStore.update(budgetId, name, amount, paymentMode);

      goto(`/trips/${tripId}/budget/${budgetId}/`);
    } else {
      useBudgetStore.add(tripId, name, amount, paymentMode);

      goto(`/trips/${tripId}/budget/`);
    }
  }
</script>

<form {onsubmit}>
  <Stack space={2}>
    <StackItem>
      <TextInput label="Title" value={name} {oninput} name="name" placeholder="Title" />
    </StackItem>
    <StackItem>
      <NumberInput label="Amount" value={amount} {oninput} name="amount" placeholder="Add amount" />
    </StackItem>
    <StackItem>
      <Select label="Payment mode" name="paymentMode" onchange={oninput}>
        <option value={PaymentModes.CASH} selected={paymentMode === PaymentModes.CASH}>Cash</option>
        <option value={PaymentModes.CARD} selected={paymentMode === PaymentModes.CARD}>Card</option>
      </Select>
    </StackItem>
    <StackItem>
      <Button type="submit" disabled={!name.trim() || !amount || !paymentMode}>Save</Button>
    </StackItem>
  </Stack>
</form>

<style lang="scss">
</style>
