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
      <Icon icon="fluent-emoji-flat:cut-of-meat" />
    {:else if option.value === Category.SHOPPING}
      <Icon icon="fluent-emoji-flat:shopping-bags" />
    {:else if option.value === Category.TOUR}
      <Icon icon="noto:sailboat" />
    {:else if option.value === Category.TRANSPORT}
      <Icon icon="fluent-emoji-flat:tram-car" />
    {:else if option.value === Category.STAY}
      <Icon icon="fluent-emoji-flat:bellhop-bell" />
    {:else if option.value === Category.FLIGHT}
      <Icon icon="fluent-emoji-flat:airplane" />
    {:else if option.value === Category.ENTERTAINMENT}
      <Icon icon="fluent-emoji-flat:popcorn" />
    {:else if option.value === Category.MART}
      <Icon icon="fluent-emoji-flat:shopping-cart" />
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
    font-size: 1.6rem;
    margin-right: 8px;
  }
</style>
