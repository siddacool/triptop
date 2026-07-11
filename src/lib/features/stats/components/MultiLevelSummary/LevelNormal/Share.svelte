<script lang="ts">
  import ProgressFill from '$lib/components/ui/ProgressFill/ProgressFill.svelte';
  import type { ExpenseSummary } from '$lib/features/stats/types';

  type Props = {
    class?: string;
    expenseSummary: ExpenseSummary;
  };

  let { class: className = '', expenseSummary }: Props = $props();

  const classes = $derived(['Share', className].filter(Boolean));
  const share = $derived(expenseSummary.share);
</script>

<div class={classes.join(' ')}>
  <ProgressFill value={share} />
</div>

<style lang="scss">
  .Share {
    display: table-cell;
    color: var(--dodo-color-neutral-800);
    padding: var(--dodo-ui-space);
    width: auto;
    padding-right: 0;
    vertical-align: middle;
  }
</style>
