<script lang="ts">
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import FormControl from '$lib/ui-lib/FormControl/FormControl.svelte';
  import TextInput from '$lib/ui-lib/TextInput';
  import type { EventHandler } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { CreateTripFormData } from '$lib/stores/trip/create.svelte';
  import Button from '$lib/ui-lib/Button';
  import Message from '$lib/ui-lib/Message/Message.svelte';

  interface EditTripProps {
    onsubmit: EventHandler<SubmitEvent, HTMLFormElement>;
    header?: Snippet;
    formData?: CreateTripFormData;
    errorMessage?: string;
    loading?: boolean;
    createNew?: boolean;
    onchange: (e: Event) => void;
    ondelete?: () => void;
  }

  const {
    onsubmit,
    header,
    formData,
    errorMessage,
    loading = false,
    createNew = false,
    onchange,
    ondelete,
  }: EditTripProps = $props();
</script>

<div class="EditTrip">
  <Card>
    <form {onsubmit}>
      <Grid spacing={2}>
        {#if header}
          <Column>
            {@render header?.()}
          </Column>
        {/if}
        <Column>
          <Grid spacing={1}>
            <Column>
              <FormControl label="Enter Trip Name" for="name">
                <TextInput
                  name="name"
                  id="name"
                  placeholder="Enter Trip Name"
                  value={formData?.name}
                  oninput={(e) => onchange(e)}
                />
              </FormControl>
            </Column>
            <Column>
              <div class="Control">
                {#if createNew}
                  <Button
                    type="submit"
                    disabled={loading || !formData?.name?.trim() ? true : false}
                    name="save"
                    color="secondary"
                  >
                    Create
                  </Button>
                {:else}
                  <Button
                    type="submit"
                    disabled={loading || !formData?.name?.trim() ? true : false}
                    name="save"
                    color="secondary"
                  >
                    Save
                  </Button>
                  <Button
                    disabled={loading || !formData?.name?.trim() ? true : false}
                    name="save"
                    color="danger"
                    class="Delete"
                    onclick={ondelete}
                  >
                    Delete Trip
                  </Button>
                {/if}
              </div>
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

<style lang="scss">
  .EditTrip {
    form {
      display: block;
    }

    :global(.Control) {
      display: flex;
      justify-content: space-between;
    }

    :global(.Delete) {
      margin-left: auto;
    }
  }
</style>
