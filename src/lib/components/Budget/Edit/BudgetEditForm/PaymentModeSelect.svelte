<script lang="ts">
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import type { PaymentModes } from '$lib/stores/payment-mode/types';

  interface Props {
    onchange: (e: Event) => void;
    value: PaymentModes;
  }

  const { onchange, value }: Props = $props();
</script>

<StackItem>
  <Select {onchange} name="paymentMode" label="Select payment mode">
    {#each paymentModeOptions as paymentModeOption}
      <option value={paymentModeOption.value} selected={value === paymentModeOption.value}>
        {paymentModeOption.label}
      </option>
    {/each}
  </Select>
</StackItem>
