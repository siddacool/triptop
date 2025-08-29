<script lang="ts">
  import { goto } from '$app/navigation';
  import Header from '$lib/components/Header.svelte';
  import EditTrip from '$lib/components/Trip/EditTrip.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateTripStore } from '$lib/stores/trip/create.svelte';

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
</script>

<div class="CreateTrip">
  <EditTrip
    {onsubmit}
    {onchange}
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
