<script lang="ts">
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import Budget from './Budget.svelte';
  import TotalExpense from './TotalExpense.svelte';
  import TripDate from './TripDate.svelte';
</script>

<StackItem>
  <div class="TripDetailCard">
    <Card>
      <TotalExpense />
      <hr />
      <Budget />
      <hr />
      <TripDate />
    </Card>
  </div>
</StackItem>

<style lang="scss">
  .TripDetailCard {
    :global(.Card) {
      padding-left: 0;
      padding-right: 0;
    }

    hr {
      border: 0;
      border-top: 1px solid var(--color-grey-500);
      margin-top: 0;
      margin-bottom: 8px;
    }
  }
</style>
