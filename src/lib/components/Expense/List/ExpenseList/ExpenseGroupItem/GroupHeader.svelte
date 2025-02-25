<script lang="ts">
  import { getMoment } from '$lib/helpers/time';
  import type { ExpenseDateGroup } from '$lib/stores/expense/types';

  interface Props {
    expenseGroup: ExpenseDateGroup;
  }

  const { expenseGroup }: Props = $props();
</script>

<div class="GroupHeader">
  <div class="date">
    {getMoment(expenseGroup.date).format('MMM, D')}
  </div>
</div>

<style lang="scss">
  .GroupHeader {
    margin-bottom: 8px;

    .date {
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
</style>
