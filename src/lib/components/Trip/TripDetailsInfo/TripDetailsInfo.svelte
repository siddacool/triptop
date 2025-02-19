<script lang="ts">
  import ItemList from '$lib/components/ItemList.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import BudgetRemaining from './BudgetRemaining.svelte';
  import BudgetTotal from './BudgetTotal.svelte';
  import Date from './Date.svelte';
  import TotalExpense from './TotalExpense.svelte';
</script>

<StackItem>
  <div class="TripDetailsInfo">
    <Card>
      <ItemList>
        <TotalExpense />
        <BudgetTotal />
        <BudgetRemaining />
        <Date />
      </ItemList>
    </Card>
  </div>
</StackItem>

<style lang="scss">
  .TripDetailsInfo {
    :global(a) {
      text-decoration: none;
      color: var(--color-primary-800);
    }

    :global(.Card) {
      padding: 0;
    }
  }
</style>
