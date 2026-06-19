<script lang="ts">
  import { Select, type SelectProps } from '@flightlesslabs/dodo-ui-bits';
  import DecoratedOption from './DecoratedOption.svelte';
  import { categoryOptions } from '$lib/stores/category/data';
  import { type CategoryOption } from '$lib/stores/category/types';

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
