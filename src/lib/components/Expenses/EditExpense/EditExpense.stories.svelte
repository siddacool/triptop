<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import EditExpense from './EditExpense.svelte';
  import { Category, PaymentModes, type Expense } from '$lib/stores/expense/types';
  import { Theme } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: EditExpense,
    tags: ['autodocs'],
    args: {
      currency: 'USD',
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Create" args={{ mode: 'create' }} />

<Story
  name="Edit"
  args={{
    mode: 'edit',
    data: {
      name: 'Dinner at Koko',
      amount: 500,
      category: Category.TRANSPORT,
      paymentMode: PaymentModes.CASH,
      date: '2025-05-12',
    } as Expense,
  }}
/>

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <EditExpense mode="create" currency="USD" />
  </Theme>
</Story>
