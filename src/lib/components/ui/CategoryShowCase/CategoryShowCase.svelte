<script lang="ts">
  import { categoryOptions, type Category } from '$lib/stores/expense/types';
  import Icon from '@iconify/svelte';

  type Props = {
    value: Category;
    class?: string;
  };

  const { class: className = '', value }: Props = $props();

  const classes = $derived(['CategoryShowCase', className].filter(Boolean));
  const category = $derived(categoryOptions.find((item) => item.value === value));
</script>

{#if category}
  <div class={classes.join(' ')}>
    {#if category.meta?.icon?.name}
      <span class="icon">
        <Icon icon={category.meta?.icon?.name} />
      </span>
    {/if}

    {category.label}
  </div>
{/if}

<style lang="scss">
  .CategoryShowCase {
    color: inherit;
    font-size: inherit;

    .icon {
      margin-right: 8px;
      display: inline-flex;
      font-size: 1.25rem;
    }
  }
</style>
