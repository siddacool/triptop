<script lang="ts">
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import type { Expense } from '$lib/features/expense/types';
  import { Column } from '@flightlesslabs/dodo-ui';
  import CategoryShowCase from '../Category/CategoryShowCase/CategoryShowCase.svelte';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();
</script>

<Column>
  <FieldValue size="small">
    <CategoryShowCase value={expense.category} />
  </FieldValue>
</Column>
