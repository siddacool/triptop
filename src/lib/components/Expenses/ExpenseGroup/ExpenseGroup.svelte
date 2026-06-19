<script lang="ts">
  import type { ExpensesDateGroup } from '$lib/stores/expense/getters/group-expenses';
  import type { Trip } from '$lib/stores/trip/types';
  import DateGroup from './DateGroup/DateGroup.svelte';

  type Props = {
    data: ExpensesDateGroup[];
    trip: Trip;
  };

  let { data, trip }: Props = $props();
</script>

<ul class="ExpenseGroup">
  {#each data as group (group.date)}
    <DateGroup data={group} {trip} />
  {/each}
</ul>

<style lang="scss">
  .ExpenseGroup {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin-top: var(--dodo-ui-space);
  }
</style>
