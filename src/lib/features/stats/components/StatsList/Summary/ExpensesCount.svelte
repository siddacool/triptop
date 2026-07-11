<script lang="ts">
  import { Column } from '@flightlesslabs/dodo-ui';
  import { statsStore } from '$lib/features/stats/store/main.svelte';
</script>

<Column>
  <div class="ExpensesCount">
    Total expenses: <b>{statsStore.tripSummary?.expenseCount}</b>
  </div>
</Column>

<style lang="scss">
  .ExpensesCount {
    display: flex;
    align-items: center;
    font-size: 1rem;

    b {
      margin-left: 4px;
      font-weight: 500;
    }
  }
</style>
