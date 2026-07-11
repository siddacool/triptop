<script lang="ts">
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import Divider from '$lib/components/ui/Divider/Divider.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import ArchiveTrip from '$lib/features/trip/components/TripUpdate/ArchiveTrip.svelte';
  import DeleteTrip from '$lib/features/trip/components/TripUpdate/DeleteTrip.svelte';
  import UpdateTrip from '$lib/features/trip/components/TripUpdate/UpdateTrip.svelte';
  import { Column, Grid } from '@flightlesslabs/dodo-ui';

  const tripId = page.params.tripId;
</script>

<svelte:head>
  <title>Edit trip</title>
</svelte:head>

<WhiteMaterial>
  <Box>
    <Grid gap={2}>
      <Column>
        <div>
          <PageHeadingNav class="TripHeader" href={`/trips/${tripId}`}>Edit trip</PageHeadingNav>
          <UpdateTrip />
        </div>
      </Column>
      <Column>
        <Divider />
      </Column>
      <Column>
        <ControlSection class="TripEditControls" controlsAlignment="center">
          <DeleteTrip />
          <ArchiveTrip />
        </ControlSection>
      </Column>
    </Grid>
  </Box>
</WhiteMaterial>
