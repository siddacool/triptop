<script lang="ts">
  import ProgressFill from '$lib/components/ui/ProgressFill/ProgressFill.svelte';
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import PercentValue from './PercentValue.svelte';

  type Props = {
    class?: string;
    expenseSummary: ExpenseSummary;
  };

  let { class: className = '', expenseSummary }: Props = $props();

  const classes = $derived(['cell', 'Share', className].filter(Boolean));
  const share = $derived(expenseSummary.share);
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
