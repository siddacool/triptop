<script lang="ts">
  import type { CategoryOption } from '$lib/stores/expense/types';
  import CategoryIcon from '../CategoryIcon/CategoryIcon.svelte';

  type Props = {
    option?: CategoryOption;
  };

  let { option }: Props = $props();
</script>

{#if option}
  <div class="DecoratedOption">
    <CategoryIcon value={option.value} class="DecoratedOptionCategoryIcon" />
    {option.label}
  </div>
{/if}

<style lang="scss">
  .DecoratedOption {
    display: flex;
    align-items: center;

    :global(.DecoratedOptionCategoryIcon) {
      margin-right: 8px;
      font-size: 1.25rem;
    }
  }
</style>
