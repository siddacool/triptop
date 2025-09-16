<script lang="ts">
  import { getMoment } from '@flightlesslabs/utils';

  interface DateDisplayProps {
    data?: string;
  }

  const { data }: DateDisplayProps = $props();
  const dateObject = $derived(getMoment(data, 'YYYY-MM-DD'));
  const isToday = $derived(getMoment(dateObject).isSame(getMoment(), 'day'));
  const isYesterday = $derived(getMoment(dateObject).isSame(getMoment().subtract(1, 'day'), 'day'));
</script>

<p class="DateDisplay">
  {#if isToday}
    Today
  {:else if isYesterday}
    Yesterday
  {:else}
    {getMoment(data, 'YYYY-MM-DD').format('ddd, MMM D')}
  {/if}
</p>

<style lang="scss">
  .DateDisplay {
    font-size: 0.85rem;
    margin: 6px 0;
    margin-top: -8px;
  }
</style>
