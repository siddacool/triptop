<script lang="ts">
  import { categoryOptions } from '$lib/stores/expense/expense.svelte';
  import { Category, type CategoryOption } from '$lib/stores/expense/types';
  import Icon from '@iconify/svelte';

  interface CategoryFormattedOptionProps {
    category?: Category;
    hideLogo?: boolean;
    hideLabel?: boolean;
  }

  const { category, hideLogo = false, hideLabel = false }: CategoryFormattedOptionProps = $props();

  const option = $derived(
    categoryOptions.find((item) => item.value === category) ||
      categoryOptions[categoryOptions.length - 1],
  );
</script>

{#snippet logo(option: CategoryOption)}
  <div class="Logo">
    {#if option.value === Category.FOOD}
      <Icon icon="fluent:food-16-filled" />
    {:else if option.value === Category.SHOPPING}
      <Icon icon="ant-design:shopping-filled" />
    {:else if option.value === Category.TOUR}
      <Icon icon="simple-icons:boat" />
    {:else if option.value === Category.TRANSPORT}
      <Icon icon="tabler:car-filled" />
    {:else if option.value === Category.STAY}
      <Icon icon="ri:service-bell-fill" />
    {:else if option.value === Category.FLIGHT}
      <Icon icon="mdi:flight" />
    {:else if option.value === Category.ENTERTAINMENT}
      <Icon icon="fa6-solid:masks-theater" />
    {:else if option.value === Category.MART}
      <Icon icon="mdi:cart" />
    {:else}
      <Icon icon="ant-design:product-filled" />
    {/if}
  </div>
{/snippet}

<div class="CategoryFormattedOption" data-value={option.value}>
  {#if !hideLogo}
    {@render logo(option)}
  {/if}

  {#if !hideLabel}
    {option.label}
  {/if}
</div>

<style lang="scss">
  .CategoryFormattedOption {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }

  .Logo {
    background-color: var(--color-grey-200);
    color: var(--color-primary-600);
    width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.35rem;
    margin-right: 8px;
  }
</style>
