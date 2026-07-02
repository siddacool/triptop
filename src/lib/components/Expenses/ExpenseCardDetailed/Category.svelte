<script lang="ts">
  import CategoryShowCase from '$lib/components/ui/Category/CategoryShowCase/CategoryShowCase.svelte';
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import { Column } from '@flightlesslabs/dodo-ui';

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
