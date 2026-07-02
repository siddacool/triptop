<script>
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
</script>

<h2>{useTripStore.trip?.name}</h2>

<style lang="scss">
  h2 {
    margin: 0;
    color: var(--dodo-color-neutral-700);
    font-variation-settings: 'wdth' 78;
  }
</style>
