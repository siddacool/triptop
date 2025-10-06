<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExpenseCard from './ExpenseCard.svelte';
  import { Category, PaymentModes } from '$lib/stores/expense/individual.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: ExpenseCard,
    tags: ['autodocs'],
    args: {
      data: {
        id: 1,
        _id: 'exp_001',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        name: 'Dinner at Italian Restaurant',
        amount: 45.5,
        tripId: 'trip_123',
        category: Category.FOOD,
        date: new Date('2025-09-25').getTime(),
        paymentMode: PaymentModes.CASH,
        currency: 'USD',
        tags: JSON.stringify(['dinner', 'restaurant', 'italian']),
      },
    },
  });
</script>

<Story name="Default" />

<Story
  name="INR"
  args={{
    data: {
      id: 1,
      _id: 'exp_001',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: 'Jwellary',
      amount: 100000,
      tripId: 'trip_123',
      category: Category.SHOPPING,
      date: new Date('2025-09-25').getTime(),
      paymentMode: PaymentModes.CASH,
      currency: 'INR',
    },
  }}
/>

<Story
  name="Payment Mode Card"
  args={{
    data: {
      id: 1,
      _id: 'exp_001',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: 'Dinner at Italian Restaurant',
      amount: 45.5,
      tripId: 'trip_123',
      category: Category.FOOD,
      date: new Date('2025-09-25').getTime(),
      paymentMode: PaymentModes.CARD,
      currency: 'USD',
      tags: JSON.stringify(['dinner', 'restaurant', 'italian']),
    },
  }}
/>

<Story
  name="details"
  args={{
    details: true,
  }}
/>

<Story
  name="details Payment Mode Card"
  args={{
    details: true,
    data: {
      id: 1,
      _id: 'exp_001',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: 'Dinner at Italian Restaurant',
      amount: 45.5,
      tripId: 'trip_123',
      category: Category.FOOD,
      date: new Date('2025-09-25').getTime(),
      paymentMode: PaymentModes.CARD,
      currency: 'USD',
      tags: JSON.stringify(['dinner', 'restaurant', 'italian']),
    },
  }}
/>
