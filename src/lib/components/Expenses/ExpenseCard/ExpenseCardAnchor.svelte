<script lang="ts">
  import type { Snippet } from 'svelte';
  import { resolve } from '$app/paths';
  import type { Expense } from '$lib/stores/expense/types';

  type Props = {
    expense: Expense;
    children?: Snippet;
    class?: string;
  };

  let { children, expense, class: className = '' }: Props = $props();

  const classes = $derived(
    ['ExpenseCardAnchor', 'dodo-shadow-1', expense.archived ? 'archived' : '', className].filter(
      Boolean,
    ),
  );
</script>

<a class={classes.join(' ')} href={resolve(`/trips/${expense.tripId}/expenses/${expense._id}`)}>
  {@render children?.()}
</a>

<style lang="scss">
  .ExpenseCardAnchor {
    display: flex;
    margin: 0;
    padding: 0;
    margin-bottom: var(--dodo-ui-space);
    color: var(--dodo-color-neutral-800);
    text-decoration: none;
    padding: var(--dodo-ui-space);
    border-radius: var(--dodo-ui-element-roundness-1);
    background-color: var(--dodo-ui-Card-default-bg);
    transition:
      background-color 70ms,
      color 70ms,
      border-color 70ms;

    &:hover {
      background-color: var(--dodo-ui-Card-text-primary-hover-bg);
    }

    &:active {
      background-color: var(--dodo-ui-Card-text-primary-active-bg);
    }

    &.archived {
      opacity: 0.6;
    }
  }
</style>
