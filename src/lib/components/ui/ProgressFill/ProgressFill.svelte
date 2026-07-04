<script lang="ts">
  import { calculatePercentage } from '$lib/helpers/calculatePercentage';
  import { Meter } from 'bits-ui';

  type Props = {
    class?: string;
    value: number;
  };

  let { class: className = '', value }: Props = $props();

  const classes = $derived(['ProgressFill', className].filter(Boolean));
  const percentage = $derived(calculatePercentage(value));
</script>

<div class={classes.join(' ')}>
  <Meter.Root {value} min={0} max={1} class="Meter">
    <div class="Bar" style={`width: ${percentage}%`}></div>
  </Meter.Root>
</div>

<style lang="scss">
  .ProgressFill {
    width: 100%;
    display: flex;
    flex-direction: column;
    :global(.Meter) {
      display: flex;
      width: 100%;
    }

    .Bar {
      width: 0%;
      background-color: var(--dodo-color-primary-600);
      height: var(--dodo-ui-track-element-height-small);
      border-radius: 2px;
      transition: width 200ms;
    }
  }
</style>
