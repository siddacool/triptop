<script lang="ts">
  import CurrencyAndAmount from '$lib/components/CurrencyAndAmount.svelte';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import { getCurrencyWiseTotal, type CurrencyWiseTotal } from '$lib/stores/expense/list.svelte';
  import { Column } from '@flightlesslabs/grid';

  interface TotalExpenseProps {
    data?: Expense[];
  }

  const { data }: TotalExpenseProps = $props();

  const curruncyWiseTotal = $derived<CurrencyWiseTotal[]>([...getCurrencyWiseTotal(data || [])]);
</script>

{#if curruncyWiseTotal.length}
  <div class="TotalExpense">
    <ul>
      {#each curruncyWiseTotal as item (item.currency)}
        <li>
          <CurrencyAndAmount currency={item.currency} amount={item.total} />
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .TotalExpense {
    font-size: 0.9rem;

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      display: block;
      margin: 0;
      padding: 0;

      &:not(&:last-child) {
        margin-bottom: 4px;
      }
    }

    :global(.CurrencyAndAmount) {
      display: flex;
    }

    :global(.Currency) {
      font-size: 0.9rem;
      margin-right: 4px;
      margin-bottom: 0;
    }

    :global(.Amount) {
      font-size: 0.9rem;
    }
  }
</style>
