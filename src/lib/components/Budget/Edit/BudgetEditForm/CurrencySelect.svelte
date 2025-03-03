<script lang="ts">
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { currencyCodes, DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';

  interface Props {
    onchange: (e: Event) => void;
    value: string;
  }

  const { onchange, value = DEFUALT_CURRENCY.alphabeticCode }: Props = $props();
</script>

<StackItem>
  <Select {onchange} name="currency" label="Select currency">
    {#each currencyCodes as currencyCode (currencyCode.alphabeticCode)}
      <option value={currencyCode.alphabeticCode} selected={value === currencyCode.alphabeticCode}>
        {currencyCode.alphabeticCode} - {currencyCode.currency}
      </option>
    {/each}
  </Select>
</StackItem>
