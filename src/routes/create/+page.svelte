<script lang="ts">
  import { goto } from '$app/navigation';
  import Header from '$lib/components/Header.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateTripStore } from '$lib/stores/trip/create.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import FormControl from '$lib/ui-lib/FormControl/FormControl.svelte';
  import Message from '$lib/ui-lib/Message/Message.svelte';
  import TextInput from '$lib/ui-lib/TextInput/TextInput.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';

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
  <div class="createForm">
    <Card>
      <form {onsubmit}>
        <Grid spacing={4}>
          <Column>
            <Header backTo="/" aria-label="Back to trips">Create a new trip</Header>
          </Column>
          <Column>
            <Grid spacing={3}>
              <Column>
                <FormControl label="Enter Trip Name" for="name">
                  <TextInput
                    name="name"
                    id="name"
                    placeholder="Enter Trip Name"
                    value={useCreateTripStore.formData.name}
                    oninput={(e) =>
                      useCreateTripStore.updateForm({ name: (e.target as HTMLInputElement).value })}
                  />
                </FormControl>
              </Column>
              <Column>
                <Button
                  type="submit"
                  disabled={useCreateTripStore.loading || !useCreateTripStore.formData.name?.trim()
                    ? true
                    : false}
                  name="save"
                  color="safe"
                >
                  Save
                </Button>
              </Column>
              {#if errorMessage}
                <Message color="danger">
                  {errorMessage}
                </Message>
              {/if}
            </Grid>
          </Column>
        </Grid>
      </form>
    </Card>
  </div>
</div>

<style lang="scss">
  .createForm {
    margin-top: 16px;

    form {
      display: block;
    }
  }
</style>
