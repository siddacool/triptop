<script lang="ts">
  import CategoryIcon from '$lib/components/ui/Category/CategoryIcon/CategoryIcon.svelte';
  import type { Expense } from '$lib/stores/expense/types';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(['Category', expense.archived ? 'archived' : ''].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <CategoryIcon value={expense.category} class="ExpenseCardCategoryIcon" />
</div>

<style lang="scss">
  .Category {
    display: inline-block;
    vertical-align: middle;
    margin-right: 2px;

    :global(.ExpenseCardCategoryIcon.CategoryIcon) {
      font-size: 1.2rem;
      color: var(--dodo-color-neutral-600);
      margin-right: 0;

      @media (min-width: 600px) {
        font-size: 1.25rem;
      }
    }
  }
</style>
