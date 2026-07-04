<script lang="ts">
  import ProgressFill from '$lib/components/ui/ProgressFill/ProgressFill.svelte';
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import PercentValue from './PercentValue.svelte';

  type Props = {
    class?: string;
    expenseSummary: ExpenseSummary;
    detailed?: boolean;
  };

  let { class: className = '', expenseSummary, detailed }: Props = $props();

  const classes = $derived(['Share', `${detailed ? 'detailed' : ''}`, className].filter(Boolean));
  const share = $derived(expenseSummary.share);
</script>

<div class={classes.join(' ')}>
  {#if detailed}
    <PercentValue value={share} />
  {/if}
  <ProgressFill value={share} />
</div>

<style lang="scss">
  .Share {
    display: flex;
    align-items: center;
    flex: 1;

    &.detailed {
      flex: initial;
      width: 100%;
    }
  }
</style>
