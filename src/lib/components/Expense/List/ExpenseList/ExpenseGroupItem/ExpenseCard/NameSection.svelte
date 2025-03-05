<script lang="ts">
  import CategoryFormattedOption from '$lib/components/Expense/CategoryFormattedOption.svelte';
  import type { Expense } from '$lib/stores/expense/types';

  interface Props {
    expense: Expense;
  }

  const { expense }: Props = $props();
</script>

<div class="NameSection">
  <CategoryFormattedOption category={expense.category} hideLabel />
  {expense.name}
</div>

<style lang="scss">
  .NameSection {
    display: flex;
    font-weight: 500;
    flex-wrap: wrap;
    position: relative;
    padding-left: 40px;
    min-height: 38px;
    padding-top: 3px;

    :global(.Logo) {
      position: absolute;
      top: -6px;
      left: -6px;
      margin: 0;
    }
  }
</style>
