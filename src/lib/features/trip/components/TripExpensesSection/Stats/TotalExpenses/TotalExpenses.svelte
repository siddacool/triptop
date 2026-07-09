<script lang="ts">
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Total from './Total.svelte';
  import TotalHomeCurrency from './TotalHomeCurrency.svelte';
</script>

{#if useTripStore.trip}
  <div class="TotalExpenses">
    <Total />
    <TotalHomeCurrency />
  </div>
{/if}

<style lang="scss">
  .TotalExpenses {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    line-height: 1;

    :global(.dodo-ui-Text) {
      color: var(--dodo-color-neutral-800);
    }
  }
</style>
