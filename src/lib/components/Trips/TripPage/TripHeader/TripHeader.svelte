<script>
  import BackButton from '$lib/components/ui/BackButton/BackButton.svelte';
  import Controls from './Controls/Controls.svelte';
  import TripName from './TripName.svelte';
</script>

<div class="TripHeader">
  <BackButton href="/trips" />
  <TripName />
  <Controls />
</div>

<style lang="scss">
  .TripHeader {
    display: flex;
    align-items: center;
  }
</style>
