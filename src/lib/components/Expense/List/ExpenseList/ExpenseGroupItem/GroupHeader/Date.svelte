<script lang="ts">
  import { getMoment } from '$lib/helpers/time';
  import type { ExpenseDateGroup } from '$lib/stores/expense/types';

  interface Props {
    expenseGroup: ExpenseDateGroup;
  }

  const { expenseGroup }: Props = $props();
</script>

<div class="date">
  {getMoment(expenseGroup.date).format('ddd, MMM D')}
</div>

<style lang="scss">
  .date {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-grey-font-700);
    letter-spacing: 0.3px;
  }
</style>
