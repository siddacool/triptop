<script lang="ts">
  import ProgressFill from '$lib/components/ui/ProgressFill/ProgressFill.svelte';
  import type { GroupStats } from '$lib/stores/stats/types';
  import { FormattedNumber } from '@flightlesslabs/dodo-ui';

  type Props = {
    groupStat: GroupStats;
  };

  let { groupStat }: Props = $props();
</script>

<div class="cell Share subcat">
  <div class="expert PercentValue">
    <FormattedNumber value={groupStat.stats.share} options={{ style: 'percent' }} />
  </div>
  <ProgressFill value={groupStat.stats.share} />
</div>

<style lang="scss">
  .Share {
    width: 100%;
    padding-right: 0;
    display: flex;
    align-items: center;
  }

  .PercentValue {
    font-size: 0.9rem;
    font-weight: 600;
    width: 45px;
  }
</style>
