<script>
  import Nav from './Nav.svelte';
  import TripDetails from './TripDetails/TripDetails.svelte';
  import ExpandedHeader from '$lib/components/ui/ExpandedHeader/ExpandedHeader.svelte';
  import { Grid } from '@flightlesslabs/dodo-ui';
</script>

<ExpandedHeader class="TripHeader">
  <Grid>
    <Nav />
    <TripDetails />
  </Grid>
</ExpandedHeader>

<style lang="scss">
  :global(.TripHeader .ExpandedHeaderCard) {
    padding: calc(var(--dodo-ui-space) * 1) 0;
    padding-bottom: calc(var(--dodo-ui-space) * 2);
    border-bottom-left-radius: var(--dodo-ui-element-roundness-2);
    border-bottom-right-radius: var(--dodo-ui-element-roundness-2);
  }
</style>
