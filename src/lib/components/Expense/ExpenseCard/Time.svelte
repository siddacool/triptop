<script lang="ts">
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import { getMoment } from '@flightlesslabs/utils';

  interface TimeProps {
    date: number;
  }

  const { date }: TimeProps = $props();
</script>

<div class="Time">{getMoment(date).format('h:m a')}</div>

<style lang="scss">
  .Time {
    font-size: 0.85rem;
    color: var(--dodo-color-neutral-600);
  }
</style>
