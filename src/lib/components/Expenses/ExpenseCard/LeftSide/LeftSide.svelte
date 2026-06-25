<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  import Title from './Title.svelte';
</script>

<div class="LeftSide">
  <Title {expense} />
</div>

<style lang="scss">
  .LeftSide {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
