<script lang="ts">
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import { createDate } from '$lib/helpers/date-time/createDate';
  import type { Expense } from '$lib/stores/expense/types';
  import { Column } from '@flightlesslabs/dodo-ui';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();
</script>

<Column>
  <FieldValue size="small">
    {createDate(expense.date).format('ddd, MMM D, YYYY')}
  </FieldValue>
</Column>
