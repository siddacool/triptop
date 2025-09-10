<script lang="ts">
  import { currencyCodes } from '$lib/stores/currency/currency-codes';
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import { useExpensesStore } from '$lib/stores/expense/list.svelte';
  import FormControl from '$lib/ui-lib/FormControl';
  import Select from '$lib/ui-lib/Select';
  import { Column } from '@flightlesslabs/grid';

  interface CurrencyProps {
    formData?: CreateExpenseFormData;
    onchange: (name: string, value: string) => void;
  }

  const { formData, onchange }: CurrencyProps = $props();

  const usedCurrencies = $derived([
    ...new Set(useExpensesStore.data?.map((item) => item.currency)),
  ]);

  const topCurrencyCodes = $derived(
    currencyCodes.filter((item) => usedCurrencies.includes(item.currency)),
  );

  const otherCurrencyCodes = $derived(
    currencyCodes.filter((item) => !usedCurrencies.includes(item.currency)),
  );

  const options = $derived(
    [...topCurrencyCodes, ...otherCurrencyCodes].map((item) =>
      Object.assign({
        value: item.alphabeticCode,
        label: `${item.alphabeticCode} - ${item.currency}`,
      }),
    ),
  );
</script>

<Column>
  <FormControl label="Currency:" for="currency">
    <Select
      name="currency"
      placeholder="Select Currency"
      {options}
      value={formData?.currency}
      onchange={(val) => onchange('currency', val)}
    />
  </FormControl>
</Column>

<style lang="scss">
</style>
