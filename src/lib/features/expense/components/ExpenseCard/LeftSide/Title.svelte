<script lang="ts">
  import type { Expense } from '$lib/features/expense/types';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();
</script>

{expense.name}
