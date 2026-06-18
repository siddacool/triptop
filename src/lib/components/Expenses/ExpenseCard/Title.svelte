<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(['Title', expense.archived ? 'archived' : ''].filter(Boolean));
</script>

<p class={classes.join(' ')}>{expense.name}</p>

<style lang="scss">
  .Title {
    margin: 0;
    font-weight: 400;
    font-size: 0.95rem;
    margin-right: var(--dodo-ui-space);
    flex: 1;

    @media (min-width: 600px) {
      font-size: 1rem;
      margin-right: calc(var(--dodo-ui-space) * 2);
    }

    &.archived {
      text-decoration: line-through;
    }
  }
</style>
