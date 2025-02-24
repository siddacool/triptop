<script lang="ts">
  import NumberInput from '$lib/components/ui-framework/Form/NumberInput.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { currencyCodes } from '$lib/stores/currency/currency-codes';

  interface Props {
    currency: string;
    oninput: (e: Event) => void;
    value: number;
  }

  const { currency, oninput, value }: Props = $props();

  const currencyDetails = $derived(currencyCodes.find((item) => item.alphabeticCode === currency));
</script>

<StackItem>
  <div class="amount">
    <span class="symbol">{currencyDetails?.alphabeticCode}</span>
    <NumberInput {value} {oninput} name="amount" label="Enter amount" />
  </div>
</StackItem>

<style lang="scss">
  .amount {
    display: flex;
    position: relative;

    :global(.NumberInput) {
      flex: 1;
    }

    :global(input) {
      margin-left: 40px;
    }
  }

  .symbol {
    position: absolute;
    top: 35px;
    left: 4px;
    font-weight: 500;
    font-size: 0.9rem;
  }
</style>
