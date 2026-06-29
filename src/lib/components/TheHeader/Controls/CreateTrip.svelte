<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
</script>

<Button
  aria-label="CreateTrip"
  class="TheHeaderCreateTripButton"
  variant="text"
  roundness="pill"
  title="Create new trip"
  href="/trips/create"
  compact
  color="neutral"
  background="none"
>
  <Icon icon="material-symbols:add-rounded" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TheHeaderCreateTripButton) {
    font-size: 1.55rem;
  }
</style>
