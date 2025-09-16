<script lang="ts">
  import { page } from '$app/state';
  import Header from '$lib/components/Header.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import Icon from '@iconify/svelte';
  import ExpensesDateGroup from '$lib/components/Expense/ExpensesDateGroup';

  const tripId = page.params.tripId;
</script>

<svelte:head>
  <title>{useTripStore.data?.name || 'Triptop'}</title>
  <meta name="description" content="Triptop - Trip description" />
</svelte:head>

<div class="TripDetails">
  <Grid spacing={2}>
    <Column>
      <Header backTo="/" aria-label="Back to trips">
        {useTripStore.data?.name}
        {#snippet after()}
          <Button href={`/${tripId}/edit`} aria-label="Edit trip" compact class="EditTrip">
            <Icon icon="material-symbols:edit" />
          </Button>
        {/snippet}
      </Header>
    </Column>

    <ExpensesDateGroup />
  </Grid>
</div>
