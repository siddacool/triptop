<script lang="ts">
  import { Select, type SelectProps } from '@flightlesslabs/dodo-ui-bits';
  import DecoratedOption from './DecoratedOption.svelte';
  import { paymentModesOptions } from '$lib/stores/payment-modes/data';
  import { type PaymentModesOption } from '$lib/stores/payment-modes/types';

  type Props = Partial<SelectProps>;

  let { value = $bindable(), ...restProps }: Props = $props();
</script>

<div class="CategorySelect">
  <Select {...restProps} options={paymentModesOptions} bind:value>
    {#snippet customSelectedContent({ value, options })}
      {#if value}
        <DecoratedOption
          option={options.find((item) => item.value === value) as PaymentModesOption}
        />
      {:else}
        Select category
      {/if}
    {/snippet}

    {#snippet customListItemContent({ option })}
      <DecoratedOption option={option as PaymentModesOption} />
    {/snippet}
  </Select>
</div>

<style lang="scss">
</style>
