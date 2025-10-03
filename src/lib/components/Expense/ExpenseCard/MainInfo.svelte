<script lang="ts">
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import PaymentModeIcon from '$lib/components/PaymentModeIcon.svelte';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import SpecialText from '$lib/ui-lib/SpecialText/SpecialText.svelte';

  interface MainInfoProps {
    data: Expense;
    details?: boolean;
  }

  const { data, details = false }: MainInfoProps = $props();
</script>

<div class="MainInfo" class:details>
  <div class="name">
    <CategoryIcon category={data.category} />

    {#if details}
      <SpecialText fontWeight={500} width={118}>
        {data.name}
      </SpecialText>
    {:else}
      <SpecialText width={109}>
        {data.name}
      </SpecialText>
    {/if}
  </div>

  <div class="amount">
    {#if details}
      <PaymentModeIcon paymentMode={data.paymentMode} />
    {/if}
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

    &.details {
      flex-direction: column;

      .name {
        font-size: 1.75rem;

        :global(.CategoryIcon) {
          transform: scale(1.4);
          margin-right: 8px;
        }
      }

      .amount {
        margin-top: 16px;
        font-size: 1.5rem;
        flex-direction: row;

        :global(.PaymentModeIcon) {
          vertical-align: middle;
          transform: scale(1.2);
          margin-right: 8px;
        }
      }
    }
  }
</style>
