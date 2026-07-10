<script>
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
</script>

<h2 class="TripName">{tripDetailStore.trip?.name}</h2>

<style lang="scss">
  .TripName {
    color: var(--dodo-color-neutral-700);
    font-variation-settings: 'wdth' 78;
    margin-top: 0;
    margin-bottom: calc(var(--dodo-ui-space) * 2);
  }
</style>
