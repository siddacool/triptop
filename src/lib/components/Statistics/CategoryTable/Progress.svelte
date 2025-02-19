<script lang="ts">
  import ProgressBar from '$lib/components/ui-framework/FormattedInfo/ProgressBar.svelte';

  interface Props {
    value: number;
  }

  const { value }: Props = $props();
</script>

{#if value}
  <div class="progress">
    <span class="percent">{parseInt(`${value}`, 10)}%</span>
    <ProgressBar fill={value} />
  </div>
{/if}

<style lang="scss">
  .progress {
    display: flex;
    width: 100%;
    min-width: 100px;

    :global(.ProgressBar) {
      margin-top: 8px;
      margin-bottom: 8px;
      width: 100%;
      position: relative;
      top: 7px;
      height: 4px;
    }
  }

  .percent {
    font-size: 0.85rem;
    position: absolute;
    top: 5px;
    font-weight: 500;
  }
</style>
