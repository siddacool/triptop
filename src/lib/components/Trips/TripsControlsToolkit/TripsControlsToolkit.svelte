<script>
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import CreateTrip from './CreateTrip.svelte';
  import ImportTrip from './ImportTrip.svelte';
</script>

<ControlSection class="TripsControlsToolkit" controlsAlignment="center">
  <CreateTrip />
  <ImportTrip />
</ControlSection>

<style lang="scss">
  :global(.TripsControlsToolkit) {
    margin-top: calc(var(--dodo-ui-space) * 2);
    margin-bottom: 100px;
  }
</style>
