<script lang="ts">
  import type { ExpenseDateGroup } from '$lib/stores/expense/types';
  import Date from './Date.svelte';
  import Total from './Total.svelte';

  interface Props {
    expenseGroup: ExpenseDateGroup;
  }

  const { expenseGroup }: Props = $props();
</script>

<div class="GroupHeader">
  <Date {expenseGroup} />
  <Total {expenseGroup} />
</div>

<style lang="scss">
  .GroupHeader {
    margin-bottom: 8px;
  }
</style>
