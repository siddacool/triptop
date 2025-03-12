<script lang="ts">
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
  import TagCheckbox from '$lib/components/ui-framework/Form/TagCheckboxGroup/TagCheckbox.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import type { PaymentModes } from '$lib/stores/payment-mode/types';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import PanelItem from './PanelItem.svelte';

  function onclick(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    let paymentMode = useTripsFilterStore.filters.paymentMode || [];
    const name = target.name as PaymentModes;

    if (paymentMode.includes(name)) {
      paymentMode = paymentMode.filter((item) => item !== name);
    } else {
      paymentMode.push(name);
    }

    useTripsFilterStore.updateFilters({ paymentMode });
  }
</script>

<PanelItem
  title="Payment Mode"
  onClear={() => useTripsFilterStore.updateFilters({ paymentMode: undefined })}
  disabledClear={useTripsFilterStore.filters.paymentMode?.length ? false : true}
>
  {#each paymentModeOptions as paymentModeOption (paymentModeOption.value)}
    <TagCheckbox
      name={paymentModeOption.value}
      {onclick}
      checked={useTripsFilterStore.filters.paymentMode?.includes(paymentModeOption.value)}
    >
      <PaymentModeFormattedOption paymentMode={paymentModeOption.value} />
    </TagCheckbox>
  {/each}
</PanelItem>
