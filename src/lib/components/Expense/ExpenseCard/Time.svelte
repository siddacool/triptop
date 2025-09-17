<script lang="ts">
  import { getMoment } from '@flightlesslabs/utils';

  interface TimeProps {
    date: number;
  }

  const { date }: TimeProps = $props();
</script>

<div class="Time">{getMoment(date).format('h:mm a')}</div>

<style lang="scss">
  .Time {
    font-size: 0.85rem;
    color: var(--dodo-color-neutral-600);
  }
</style>
