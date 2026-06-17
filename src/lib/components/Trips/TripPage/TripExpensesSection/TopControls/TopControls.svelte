<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '@flightlesslabs/dodo-ui';

  const tripId = page.params.tripId;
</script>

<div class="TopControls">
  <Button href={resolve(`/trips/${tripId}/expenses/add`)} roundness={2}>Add expense</Button>
</div>

<style lang="scss">
  .TopControls {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (min-width: 600px) {
      flex-direction: row;
    }

    :global(.dodo-ui-Button) {
      width: 100%;
      margin-bottom: calc(var(--dodo-ui-space) * 2);

      @media (min-width: 600px) {
        width: initial;
        margin: 0 var(--dodo-ui-space);
        margin-bottom: 0;
      }
    }
  }
</style>
