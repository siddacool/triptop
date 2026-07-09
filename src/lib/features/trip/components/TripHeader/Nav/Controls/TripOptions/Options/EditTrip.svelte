<script>
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';

  const tripId = page.params.tripId || '';
</script>

<DropdownMenuItem
  onSelect={() => goto(resolve(`/trips/${tripId}/edit`))}
  outline
  class="EditTripDropdownMenuItem"
>
  <span class="Icon">
    <Icon icon="material-symbols:edit-outline" />
  </span>
  Edit trip
</DropdownMenuItem>

<style lang="scss">
  :global(.EditTripDropdownMenuItem .Icon) {
    font-size: 1.3rem;
  }
</style>
