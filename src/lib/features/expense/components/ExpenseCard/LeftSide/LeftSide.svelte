<script lang="ts">
  import type { Expense } from '$lib/features/expense/types';
  import Category from './Category.svelte';
  import Title from './Title.svelte';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(['LeftSide', expense.archived ? 'archived' : ''].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Category {expense} />
  <Title {expense} />
</div>

<style lang="scss">
  .LeftSide {
    flex: 1;
    margin-right: var(--dodo-ui-space);
    font-weight: 400;
    font-size: 1rem;

    @media (min-width: 600px) {
      margin-right: calc(var(--dodo-ui-space) * 2);
    }

    &.archived {
      text-decoration: line-through;
    }
  }
</style>
