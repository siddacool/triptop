<script lang="ts">
  import Chip from '$lib/components/ui-framework/FormattedInfo/Chip.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import type { PaymentModes } from '$lib/stores/payment-mode/types';

  type Props = {
    paymentMode: PaymentModes;
  };

  const { paymentMode }: Props = $props();

  const paymentModeValue = $derived(
    paymentModeOptions.find((item) => item.value === paymentMode)?.label ||
      paymentModeOptions[0]?.label,
  );
</script>

<Chip size="small">{paymentModeValue}</Chip>
