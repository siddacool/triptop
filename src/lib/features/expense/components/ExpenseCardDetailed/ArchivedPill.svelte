<script lang="ts">
  import ArchivedTag from '$lib/components/ArchivedTag/ArchivedTag.svelte';
  import type { Expense } from '$lib/features/expense/types';
  import { Column } from '@flightlesslabs/dodo-ui';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();
</script>

{#if expense.archived}
  <Column>
    <ArchivedTag />
  </Column>
{/if}
