<script lang="ts">
  import { goto } from '$app/navigation';
  import Header from '$lib/components/Header.svelte';
  import EditTrip from '$lib/components/Trip/EditTrip.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateTripStore } from '$lib/stores/trip/create.svelte';
  import { editTripOnChange } from '../[tripId]/edit/+page.svelte';

  let errorMessage = $state('');

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();
      errorMessage = '';
      await useCreateTripStore.create();

      goto('/');
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    }
  }
</script>

<div class="CreateTrip">
  <EditTrip
    {onsubmit}
    onchange={editTripOnChange}
    {errorMessage}
    loading={useCreateTripStore.loading}
    formData={useCreateTripStore.formData}
    createNew
  >
    {#snippet header()}
      <Header backTo="/" aria-label="Back to trips">Create a new trip</Header>
    {/snippet}
  </EditTrip>
</div>
