<script lang="ts">
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import type { Expense } from '$lib/stores/expense/individual.svelte';

  interface MainInfoProps {
    data: Expense;
  }

  const { data }: MainInfoProps = $props();
</script>

<div class="MainInfo">
  <div class="name creativeFont">
    <CategoryIcon category={data.category} />
    {data.name}
  </div>

  <div class="amount">
    <FormattedCurrency value={data.amount} currency={data.currency} />
  </div>
</div>

<style lang="scss">
  .MainInfo {
    margin-top: 0;
    margin-bottom: 4px;
    font-size: 1.1rem;
    letter-spacing: 0.4px;
    display: flex;
    justify-content: space-between;
    font-weight: 400;

    .name {
      display: inline-block;

      :global(.CategoryIcon) {
        vertical-align: middle;
      }
    }

    .amount {
      display: flex;
      flex-direction: column;
    }
  }
</style>
