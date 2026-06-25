<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';
  import Category from './Category.svelte';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  import Title from './Title.svelte';
</script>

<div class="LeftSide">
  <Category {expense} />
  <Title {expense} />
</div>

<style lang="scss">
  .LeftSide {
    flex: 1;
    margin-right: var(--dodo-ui-space);

    @media (min-width: 600px) {
      margin-right: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
