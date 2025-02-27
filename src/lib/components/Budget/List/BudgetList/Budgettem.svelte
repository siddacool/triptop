<script lang="ts">
  import { page } from '$app/state';
  import AmountDisplay from '$lib/components/ui-framework/FormattedInfo/AmountDisplay.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import type { Budget } from '$lib/stores/budget/types';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';

  interface Props {
    budget: Budget;
  }

  const { budget }: Props = $props();
  const tripId = page.params.tripId;
</script>

<li>
  <a href={`/${tripId}/budget/${budget._id}`}>
    <Card>
      <Stack space={2}>
        <StackItem>
          <h3>{budget.name}</h3>
        </StackItem>
        <StackItem>
          <AmountDisplay value={budget.amount} currency={budget.currency} />
        </StackItem>
        <StackItem>
          <div class="paymentMode">
            {paymentModeOptions.find((item) => item.value === budget.paymentMode)?.label ||
              paymentModeOptions[0].label}
          </div>
        </StackItem>
      </Stack>
    </Card>
  </a>
</li>

<style lang="scss">
  li {
    display: block;
    margin: 0;
    padding: 0;

    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration: initial;
      color: inherit;

      &:hover {
        :global(.Card) {
          background-color: var(--color-primary-50);
        }
      }

      &:active {
        :global(.Card) {
          background-color: var(--color-primary-100);
        }
      }
    }

    .paymentMode {
      font-weight: 500;
    }

    h3 {
      font-weight: 500;
      margin: 0;
    }
  }
</style>
