<script lang="ts">
  import { resolve } from '$app/paths';
  import { type Expense } from '$lib/stores/expense/individual.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import MainInfo from './MainInfo.svelte';
  import Time from './Time.svelte';
  import PaymentModeBar from './PaymentModeBar.svelte';
  import Tags from './Tags.svelte';

  interface ExpenseCardProps {
    data: Expense;
    details?: boolean;
  }

  const { data, details = false }: ExpenseCardProps = $props();

  const resolved = resolve(`/${data.tripId}/${data._id}`);
</script>

{#snippet card()}
  <Card interactive={!details}>
    <MainInfo {data} {details} />
    <Time {data} {details} />
    <Tags {data} {details} />
    <PaymentModeBar paymentMode={data.paymentMode} />
  </Card>
{/snippet}

{#if details}
  <div class="ExpenseCard">
    {@render card()}
  </div>
{:else}
  <a class="ExpenseCard" href={resolved}>
    {@render card()}
  </a>
{/if}

<style lang="scss">
  .ExpenseCard {
    color: inherit;
    text-decoration: none;

    :global(.Card) {
      padding: 8px 12px;
      overflow: hidden;
      position: relative;
    }
  }
</style>
