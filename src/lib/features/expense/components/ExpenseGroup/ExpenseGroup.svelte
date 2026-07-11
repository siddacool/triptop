<script lang="ts">
  import type { Trip } from '$lib/features/trip/types';
  import type { ExpenseGroup } from '../../utils/group-expenses/group-expenses';
  import Expense from './Expense/Expense.svelte';
  import Header from './Header/Header.svelte';

  type Props = {
    data: ExpenseGroup[];
    trip: Trip;
  };

  let { data, trip }: Props = $props();
</script>

<div class="ExpenseGroup">
  {#each data as item (item.id)}
    {#if item.type === 'group'}
      <Header data={item} />
    {:else}
      <Expense data={item} {trip} />
    {/if}
  {/each}
</div>

<style lang="scss">
  .ExpenseGroup {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin-top: var(--dodo-ui-space);
    padding-bottom: 100px;
    color: var(--dodo-color-neutral-700);
  }
</style>
