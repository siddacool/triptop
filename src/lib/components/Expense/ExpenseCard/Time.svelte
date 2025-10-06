<script lang="ts">
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import { getMoment } from '@flightlesslabs/utils';
  import Icon from '@iconify/svelte';
  import { getContext } from 'svelte';

  const data = getContext<Expense>('ExpenseData');
  const details = getContext<boolean | undefined>('details') || false;
</script>

<div class="Time" class:details>
  {#if details}
    <section>
      <Icon icon="material-symbols:calendar-month-rounded" width="20" height="20" />
      {getMoment(data.date).format('ddd, MMM D, YYYY')}
    </section>
    <section>
      <Icon icon="tabler:clock-filled" width="20" height="20" />
      {getMoment(data.date).format('h:mm a')}
    </section>
  {:else}
    {getMoment(data.date).format('h:mm a')}
  {/if}
</div>

<style lang="scss">
  .Time {
    font-size: 0.85rem;
    color: var(--dodo-color-neutral-600);

    &.details {
      margin-top: 16px;
      color: var(--dodo-color-neutral-800);
    }

    section {
      display: flex;
      align-items: center;
      font-size: 1rem;
      margin-top: 16px;

      :global(svg) {
        display: inline-flex;
        margin-right: 4px;
      }
    }
  }
</style>
