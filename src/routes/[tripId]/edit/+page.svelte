<script lang="ts" module>
  export function editTripOnChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const name = target.name;

    switch (name) {
      case 'name':
        useCreateTripStore.updateForm({ name: target.value });
        break;
      default:
        break;
    }
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import Header from '$lib/components/Header.svelte';
  import EditTrip from '$lib/components/Trip/EditTrip.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateTripStore } from '$lib/stores/trip/create.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Loader from '$lib/ui-lib/Loader/Loader.svelte';
  import Confirm from '$lib/ui-lib/ModalMaster/Confirm';
  import { Column, Grid } from '@flightlesslabs/grid';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;

  let loading = $state<boolean>(false);
  let openDeleteConfirm = $state<boolean>(false);

  onMount(async () => {
    if (!tripId) {
      return;
    }

    await useTripStore.fetch(tripId);

    const data = useTripStore.data;

    if (!data) {
      return;
    }

    useCreateTripStore.updateForm(data);
  });

  onMount(() => {
    return () => {
      useCreateTripStore.reset();
      useTripStore.reset();
    };
  });

  let errorMessage = $state('');

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();

      if (!tripId) {
        return;
      }

      loading = true;

      errorMessage = '';

      const formData = useCreateTripStore.formData;

      await useTripStore.update(formData);

      const resolved = resolve(`/${tripId}`);

      goto(resolved);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    } finally {
      loading = false;
    }
  }

  function ondelete() {
    openDeleteConfirm = true;
  }

  async function deleteConfirmed() {
    try {
      loading = true;
      await useTripStore.delete();

      const resolved = resolve(`/`);

      goto(resolved);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Edit Trip: {useTripStore.data?.name}</title>
  <meta name="description" content="Triptop - Edit Trip" />
</svelte:head>

<Confirm onaccept={deleteConfirmed} bind:open={openDeleteConfirm}>
  {#snippet title()}
    Delete Trip
  {/snippet}

  Do you want to Delete {useTripStore.data?.name} ?
</Confirm>

<div class="EditTrip">
  {#if useTripStore.fetching}
    <Grid spacing={2}>
      <Column>
        <Loader />
      </Column>
    </Grid>
  {:else if useTripStore.data?._id}
    <EditTrip
      {onsubmit}
      onchange={editTripOnChange}
      {errorMessage}
      loading={useCreateTripStore.loading || loading}
      formData={useCreateTripStore.formData}
      {ondelete}
    >
      {#snippet header()}
        <Header backTo={`/${tripId}`} aria-label="Back to trips">Edit trip</Header>
      {/snippet}
    </EditTrip>
  {/if}
</div>
