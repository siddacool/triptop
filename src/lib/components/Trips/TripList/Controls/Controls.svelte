<script>
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import CreateTrip from './CreateTrip.svelte';
  import ImportTrip from './ImportTrip.svelte';
</script>

<ControlSection class="TripListControls" controlsAlignment="center">
  <CreateTrip />
  <ImportTrip />
</ControlSection>

<style lang="scss">
  :global(.TripListControls) {
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
