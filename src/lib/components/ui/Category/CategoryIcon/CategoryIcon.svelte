<script lang="ts">
  import { categoryOptions } from '$lib/stores/category/data';
  import type { Category } from '$lib/stores/category/types';
  import Icon from '@iconify/svelte';

  type Props = {
    value?: Category;
    class?: string;
  };

  const { class: className = '', value }: Props = $props();

  const classes = $derived(['CategoryIcon', className].filter(Boolean));
  const category = $derived(categoryOptions.find((item) => item.value === value));
</script>

{#if category?.meta?.icon?.name}
  <span class={classes.join(' ')}>
    <Icon icon={category.meta?.icon?.name} />
  </span>
{/if}

<style lang="scss">
  .CategoryIcon {
    margin-right: 4px;
    display: inline-flex;
    font-size: 1.24rem;
  }
</style>
