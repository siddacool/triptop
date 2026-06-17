<script lang="ts">
  import type { ExpensesDateGroup } from '$lib/stores/expense/getters/group-expenses';
  import DateGroup from './DateGroup/DateGroup.svelte';

  type Props = {
    data: ExpensesDateGroup[];
  };

  let { data }: Props = $props();
</script>

<ul class="ExpenseGroup">
  {#each data as group (group.date)}
    <DateGroup data={group} />
  {/each}
</ul>

<style lang="scss">
  .ExpenseGroup {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    @media (min-width: 600px) {
      margin-top: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
