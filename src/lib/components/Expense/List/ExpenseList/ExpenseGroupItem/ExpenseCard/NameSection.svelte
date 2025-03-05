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

  <div class="name">
    {expense.name}
  </div>
</div>

<style lang="scss">
  .NameSection {
    display: flex;
    font-weight: 500;
    flex-wrap: wrap;
    position: relative;

    :global(.Logo) {
      position: absolute;
      top: -10px;
      left: -10px;
      margin: 0;
    }

    .name {
      margin-left: 36px;
    }
  }
</style>
