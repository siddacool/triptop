<script lang="ts">
  import { page } from '$app/state';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import NameSection from './NameSection.svelte';
  import AmountSection from './AmountSection.svelte';
  import DateSection from './DateSection.svelte';

  interface Props {
    expense: Expense;
  }

  const { expense }: Props = $props();
  const tripId = page.params.tripId;
</script>

<li class="ExpenseCard">
  <a href={`/${tripId}/${expense._id}`}>
    <Card>
      <Stack space={1}>
        <StackItem>
          <article class="top">
            <NameSection {expense} />
            <AmountSection {expense} />
          </article>
        </StackItem>
        <StackItem>
          <article>
            <DateSection {expense} />
          </article>
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

    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration: initial;
      color: inherit;

      :global(.Card) {
        padding: 16px 16px;
      }

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

    article {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.top {
        align-items: flex-start;
      }
    }
  }
</style>
