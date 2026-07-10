<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import PrimaryButton from '$lib/components/ui/Buttons/PrimaryButton/PrimaryButton.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId;
</script>

<Box>
  <Instructions>
    You don't have any expenses.<br /> use "Add expense" button to add an expense
  </Instructions>
  <ControlSection controlsAlignment="center">
    <PrimaryButton href={resolve(`/trips/${tripId}/expenses/add`)} class="TripPageAddExpenseButton">
      <span class="Icon">
        <Icon icon="material-symbols:add-rounded" />
      </span>
      Add expense
    </PrimaryButton>
  </ControlSection>
</Box>

<style lang="scss">
  :global(.TripPageAddExpenseButton .Icon) {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
  }
</style>
