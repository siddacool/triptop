<script lang="ts" module>
  export interface DateGroup {
    date: string;
    dateObject: Dayjs;
    expenses: Expense[];
  }
</script>

<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';
  import type { Dayjs } from 'dayjs';
  import DateBar from './DateBar.svelte';
  import ItemList from '$lib/components/ItemList.svelte';
  import StyledCard from './StyledCard.svelte';
  interface Props {
    dateGroup: DateGroup;
  }

  const { dateGroup }: Props = $props();
</script>

<div class="ExpenseListItem">
  <DateBar {dateGroup} />
  <ItemList>
    {#each dateGroup.expenses as expense}
      <StyledCard {expense} />
    {/each}
  </ItemList>
</div>

<style lang="scss">
  .ExpenseListItem {
    margin-top: 32px;

    &:first-child {
      margin-top: 0;
    }
  }
</style>
