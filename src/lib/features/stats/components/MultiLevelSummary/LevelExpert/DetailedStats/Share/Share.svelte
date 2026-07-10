<script lang="ts">
  import ProgressFill from '$lib/components/ui/ProgressFill/ProgressFill.svelte';
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import PercentValue from './PercentValue.svelte';

  type Props = {
    class?: string;
    expenseSummary: ExpenseSummary;
  };

  let { class: className = '', expenseSummary }: Props = $props();

  const classes = $derived(['Share', className].filter(Boolean));
  const share = $derived(expenseSummary.share);
</script>

<div class={classes.join(' ')}>
  <PercentValue value={share} />

  <div class="fill">
    <ProgressFill value={share} />
  </div>
</div>

<style lang="scss">
  .Share {
    color: var(--dodo-color-neutral-800);
    margin-top: calc(var(--dodo-ui-space) / 1);
    margin-bottom: calc(var(--dodo-ui-space) * 1.4);
    display: table-row;
    width: 100%;

    .fill {
      width: auto; /* Takes the remaining width */
      display: table-cell;
      padding: var(--dodo-ui-space);
      padding-right: 0;
      vertical-align: middle;
    }
  }
</style>
