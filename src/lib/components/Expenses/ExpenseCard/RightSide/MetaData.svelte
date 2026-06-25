<script lang="ts">
  import CategoryIcon from '$lib/components/ui/Category/CategoryIcon/CategoryIcon.svelte';
  import type { Expense } from '$lib/stores/expense/types';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(['MetaData', expense.archived ? 'archived' : ''].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <CategoryIcon value={expense.category} class="MetaDataIcon" />
</div>

<style lang="scss">
  .MetaData {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: var(--dodo-ui-space);

    :global(.MetaDataIcon) {
      font-size: 1.2rem;
      margin-right: 4px;
      color: var(--dodo-color-neutral-600);

      @media (min-width: 600px) {
        font-size: 1.25rem;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
