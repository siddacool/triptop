<script lang="ts">
  import type { Expense } from '$lib/features/expense/types';
  import CategoryIcon from '../../Category/CategoryIcon/CategoryIcon.svelte';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(
    ['ExpenseCardCategory', expense.archived ? 'archived' : ''].filter(Boolean),
  );
</script>

<CategoryIcon value={expense.category} class={classes.join(' ')} />

<style lang="scss">
  :global(.ExpenseCardCategory.CategoryIcon) {
    display: inline-block;
    vertical-align: middle;
    margin-right: 2px;
    font-size: 1.2rem;
    color: var(--dodo-color-neutral-600);

    @media (min-width: 600px) {
      font-size: 1.25rem;
    }
  }
</style>
