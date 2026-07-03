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

  const classes = $derived(
    ['cell', 'Share', `${detailed ? 'detailed' : ''}`, className].filter(Boolean),
  );
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
    width: 100%;
    padding-right: 0;
    display: flex;
    align-items: center;

    &.detailed {
      margin-bottom: calc(var(--dodo-ui-space) * 0.5);
    }
  }
</style>
