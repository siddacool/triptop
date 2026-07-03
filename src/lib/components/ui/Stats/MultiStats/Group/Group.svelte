<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { GroupStats } from '$lib/stores/stats/types';
  import Share from './Share.svelte';
  import Amount from './Amount.svelte';
  import type { MoneyValue } from '$lib/stores/currency/types';
  import LabelGroup from './LabelGroup.svelte';

  type Props = {
    class?: string;
    children?: Snippet;
    groupStat: GroupStats;
  };

  let { class: className = '', children, groupStat }: Props = $props();

  const classes = $derived(['Group', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <div class="cell title">
    <div class="box">
      {@render children?.()}
    </div>
  </div>
  <Share {groupStat} />
  <div class="cell expert subcat">
    <div class="Amounts">
      <Amount value={groupStat.stats.total} label="Total" />
      <Amount value={groupStat.stats.average} label="Average" />
      <Amount value={groupStat.stats.largest as MoneyValue} label="Largest" />
      <LabelGroup label="Expenses">{groupStat.stats.expenseCount}</LabelGroup>
    </div>
  </div>
</div>

<style lang="scss">
  .Group {
    .title {
      white-space: nowrap;
      font-weight: 500;
      padding-left: 0;
    }

    .box {
      display: flex;
      align-items: center;
    }

    .Amounts {
      width: 100%;
      flex-direction: column;
      margin-top: calc(var(--dodo-ui-space) * -1);
    }
  }
</style>
