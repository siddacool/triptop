<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Header from '$lib/components/Header.svelte';
  import EditTrip from '$lib/components/Trip/EditTrip.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateTripStore } from '$lib/stores/trip/create.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Loader from '$lib/ui-lib/Loader/Loader.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;

  let loading = $state<boolean>(false);

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

      goto(`/${tripId}`);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    } finally {
      loading = false;
    }
  }

  function onchange(e: Event) {
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

  async function ondelete() {
    try {
      loading = true;
      await useTripStore.delete();

      goto('/');
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    } finally {
      loading = false;
    }
  }
</script>

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
      {onchange}
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
