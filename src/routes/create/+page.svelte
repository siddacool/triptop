<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Header from '$lib/components/Header.svelte';
  import EditTrip from '$lib/components/Trip/EditTrip.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateTripStore } from '$lib/stores/trip/create.svelte';
  import { editTripOnChange } from '../[tripId]/edit/+page.svelte';
  import ImportJson from '$lib/components/Trip/ImportTrip/ImportJson';
  import Divider from '$lib/ui-lib/Divider';

  let errorMessage = $state('');

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();
      errorMessage = '';
      const newTripId = await useCreateTripStore.create();

      const resolved = resolve(`/${newTripId}`);

      goto(resolved);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    }
  }
</script>

<svelte:head>
  <title>Create Trip</title>
  <meta name="description" content="Triptop - Create a new trip" />
</svelte:head>

<div class="CreateTrip">
  <Header backTo="/" aria-label="Back to trips">Create a new trip</Header>
  <EditTrip
    {onsubmit}
    onchange={editTripOnChange}
    {errorMessage}
    loading={useCreateTripStore.loading}
    formData={useCreateTripStore.formData}
    createNew
  />

  <div class="importTrip">
    <div class="or">
      <Divider />
    </div>
    <ImportJson />
  </div>
</div>

<style lang="scss">
  .importTrip {
    margin-top: 32px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .or {
      margin-bottom: 32px;
      width: 100%;
    }
  }
</style>
