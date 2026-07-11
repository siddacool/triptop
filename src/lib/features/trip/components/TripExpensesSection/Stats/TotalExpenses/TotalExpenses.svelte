<script lang="ts">
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import Total from './Total.svelte';
  import TotalHomeCurrency from './TotalHomeCurrency.svelte';
</script>

{#if tripDetailStore.trip}
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
