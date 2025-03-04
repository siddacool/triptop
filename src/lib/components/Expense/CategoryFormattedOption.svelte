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
  <div class={`Logo Logo--${option.value}`}>
    {#if option.value === Category.FOOD}
      <Icon icon="fluent:food-24-filled" />
    {:else if option.value === Category.SHOPPING}
      <Icon icon="ant-design:shopping-filled" />
    {:else if option.value === Category.TOUR}
      <Icon icon="fa6-solid:sailboat" />
    {:else if option.value === Category.TRANSPORT}
      <Icon icon="ri:taxi-fill" />
    {:else if option.value === Category.STAY}
      <Icon icon="ri:service-bell-fill" />
    {:else if option.value === Category.FLIGHT}
      <Icon icon="fa6-solid:plane" />
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

    &--FOOD {
      color: var(--color-category-FOOD);
    }

    &--SHOPPING {
      color: var(--color-category-SHOPPING);
    }

    &--TOUR {
      color: var(--color-category-TOUR);
    }

    &--TRANSPORT {
      color: var(--color-category-TRANSPORT);
    }

    &--STAY {
      color: var(--color-category-STAY);
    }

    &--FLIGHT {
      color: var(--color-category-FLIGHT);
    }

    &--ENTERTAINMENT {
      color: var(--color-category-ENTERTAINMENT);
    }

    &--MART {
      color: var(--color-category-MART);
    }
  }
</style>
