<script>
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
</script>

<h2>{tripDetailStore.trip?.name}</h2>

<style lang="scss">
  h2 {
    margin: 0;
    color: var(--dodo-color-neutral-700);
    font-variation-settings: 'wdth' 78;
  }
</style>
