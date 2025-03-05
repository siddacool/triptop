<script lang="ts">
  import { getMoment } from '$lib/helpers/time';
  import type { Expense } from '$lib/stores/expense/types';
  import Icon from '@iconify/svelte';

  interface Props {
    expense: Expense;
  }

  const { expense }: Props = $props();
</script>

<div class="DateSection">
  <div class="date">
    <Icon icon="tabler:clock" class="Icon" />
    {getMoment(expense.date).format('h:mm A')}
  </div>
</div>

<style lang="scss">
  .DateSection {
    display: flex;
    align-items: center;
    font-weight: 500;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 100%;

    .date {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--color-grey-font-500);

      :global(.Icon) {
        margin-right: 4px;
      }
    }
  }
</style>
