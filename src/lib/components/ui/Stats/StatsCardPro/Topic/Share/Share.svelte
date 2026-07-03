<script lang="ts">
  import ProgressFill from '$lib/components/ui/ProgressFill/ProgressFill.svelte';
  import type { GroupStats } from '$lib/stores/stats/types';
  import PercentValue from './PercentValue.svelte';

  type Props = {
    class?: string;
    groupStat: GroupStats;
  };

  let { class: className = '', groupStat }: Props = $props();

  const classes = $derived(['topic-cell', 'Share', className].filter(Boolean));
  const share = $derived(groupStat.stats.share);
</script>

<div class={classes.join(' ')}>
  <PercentValue value={share} />
  <ProgressFill value={share} />
</div>

<style lang="scss">
  .Share {
    width: 100%;
    padding-right: 0;
    display: flex;
    align-items: center;
  }
</style>
