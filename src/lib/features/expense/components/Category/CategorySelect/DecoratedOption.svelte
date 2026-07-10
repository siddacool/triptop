<script lang="ts">
  import type { CategoryOption } from '$lib/features/expense/types/category';
  import CategoryIcon from '../CategoryIcon/CategoryIcon.svelte';

  type Props = {
    option?: CategoryOption;
    isListItem?: boolean;
  };

  let { option, isListItem = false }: Props = $props();
</script>

{#if option}
  <div class="DecoratedOption" class:isListItem>
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

    &.isListItem {
      font-size: 0.8rem;
      @media (min-width: 400px) {
        font-size: 1rem;
      }

      :global(.DecoratedOptionCategoryIcon) {
        font-size: 1rem;

        @media (min-width: 400px) {
          font-size: 1.25rem;
        }
      }
    }
  }
</style>
