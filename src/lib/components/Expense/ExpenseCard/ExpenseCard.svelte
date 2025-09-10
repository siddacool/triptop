<script lang="ts">
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';

  interface ExpenseCardProps {
    data: Expense;
  }

  const { data }: ExpenseCardProps = $props();
</script>

<a class="ExpenseCard" href={`/${data.tripId}/${data._id}`}>
  <Card interactive>
    <p>
      {data.name}
    </p>
  </Card>
</a>

<style lang="scss">
  .ExpenseCard {
    color: inherit;
    text-decoration: none;

    p {
      margin: 0;
      font-size: 1.3rem;
      letter-spacing: 0.4px;
    }
  }
</style>
