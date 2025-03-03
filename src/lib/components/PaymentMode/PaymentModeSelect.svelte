<script lang="ts">
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import type { PaymentModes } from '$lib/stores/payment-mode/types';
  import FormLabel from '../ui-framework/Form/shared/FormLabel.svelte';
  import PaymentModeFormattedOption from './PaymentModeFormattedOption.svelte';

  interface Props {
    onchange: (e: Event) => void;
    value: PaymentModes;
  }

  const { onchange, value }: Props = $props();
</script>

<StackItem>
  <div class="PaymentModeSelect">
    <FormLabel label="Select payment mode" />

    <div class="selectBox">
      <span class="logo">
        <PaymentModeFormattedOption
          paymentMode={paymentModeOptions.find((item) => item.value === value)?.value}
          hideLabel
        />
      </span>
      <Select {onchange} name="paymentMode">
        {#each paymentModeOptions as paymentModeOption (paymentModeOption.value)}
          <option value={paymentModeOption.value} selected={value === paymentModeOption.value}>
            {paymentModeOption.label}
          </option>
        {/each}
      </Select>
    </div>
  </div>
</StackItem>

<style lang="scss">
  .PaymentModeSelect {
    .selectBox {
      display: flex;
      align-items: end;
    }

    .logo {
      display: inline-flex;
      margin-bottom: 3px;
    }

    :global(.Select) {
      flex: 1;
    }
  }
</style>
