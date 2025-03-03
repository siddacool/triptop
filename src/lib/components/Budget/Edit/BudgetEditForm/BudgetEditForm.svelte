<script lang="ts">
  import PaymentModeSelect from '$lib/components/PaymentMode/PaymentModeSelect.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import type { BudgetFormData } from '$lib/stores/budget/types';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import { PaymentModes } from '$lib/stores/payment-mode/types';
  import Amount from './Amount.svelte';
  import CurrencySelect from './CurrencySelect.svelte';

  interface Props {
    budgetId?: string;
    onSave: (data: BudgetFormData) => Promise<void>;
  }

  const { budgetId, onSave }: Props = $props();

  let name = $state(useBudgetStore.data.find((item) => item._id === budgetId)?.name || '');

  let amount = $state(useBudgetStore.data.find((item) => item._id === budgetId)?.amount || 0);
  let currency = $state(
    useBudgetStore.data.find((item) => item._id === budgetId)?.currency ||
      DEFUALT_CURRENCY.alphabeticCode,
  );
  let paymentMode = $state(
    useBudgetStore.data.find((item) => item._id === budgetId)?.paymentMode || PaymentModes.CASH,
  );
  let loading = $state(false);
  const disabled = $derived(!name || loading);

  function oninput(e: Event) {
    const element = e.target as HTMLInputElement;

    switch (element.name) {
      case 'name':
        name = element.value;
        break;
      case 'amount':
        amount = element.valueAsNumber;
        break;
      case 'currency':
        console.log(element.value);

        currency = element.value;
        break;
      case 'paymentMode':
        paymentMode = element.value as PaymentModes;
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

      await onSave({
        name,
        amount,
        currency,
        paymentMode,
      });
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
        <TextInput value={name} {oninput} name="name" label="Enter name" placeholder="Cash, card" />
      </StackItem>
      <CurrencySelect onchange={oninput} value={currency} />
      <PaymentModeSelect value={paymentMode} onchange={oninput} />
      <Amount {oninput} value={amount} />
      <StackItem></StackItem>
      <StackItem>
        <Button type="submit" variant="primary" {disabled}>Save</Button>
      </StackItem>
    </Stack>
  </form>
</StackItem>
