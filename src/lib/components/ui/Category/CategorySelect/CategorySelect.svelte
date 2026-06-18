<script lang="ts">
  import { categoryOptions, type CategoryOption } from '$lib/stores/expense/types';
  import { Select, type SelectProps } from '@flightlesslabs/dodo-ui-bits';
  import DecoratedOption from './DecoratedOption.svelte';

  type Props = Partial<SelectProps>;

  let { value = $bindable(), ...restProps }: Props = $props();
</script>

<div class="CategorySelect">
  <Select {...restProps} options={categoryOptions} bind:value>
    {#snippet customSelectedContent({ value, options })}
      {#if value}
        <DecoratedOption option={options.find((item) => item.value === value) as CategoryOption} />
      {:else}
        Select category
      {/if}
    {/snippet}

    {#snippet customListItemContent({ option })}
      <DecoratedOption option={option as CategoryOption} />
    {/snippet}
  </Select>
</div>

<style lang="scss">
</style>
