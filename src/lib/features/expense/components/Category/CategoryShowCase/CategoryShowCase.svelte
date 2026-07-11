<script lang="ts">
  import { categoryOptions } from '$lib/features/expense/config/category-options';
  import type { Category } from '$lib/features/expense/types/category';
  import CategoryIcon from '../CategoryIcon/CategoryIcon.svelte';

  type Props = {
    value?: Category;
    class?: string;
  };

  const { class: className = '', value }: Props = $props();

  const classes = $derived(['CategoryShowCase', className].filter(Boolean));
  const category = $derived(categoryOptions.find((item) => item.value === value));
</script>

{#if category}
  <div class={classes.join(' ')}>
    <CategoryIcon {value} />

    {category.label}
  </div>
{/if}

<style lang="scss">
  .CategoryShowCase {
    color: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
  }
</style>
