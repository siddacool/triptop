<script lang="ts">
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import Budget from './Budget.svelte';
  import TotalExpense from './TotalExpense.svelte';
  import TripDate from './TripDate.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import ExportTrip from './ExportTrip/ExportTrip.svelte';
  import ToggleButton from '$lib/components/ui-framework/Form/ToggleButton.svelte';
</script>

<StackItem>
  <div class="TripDetailCard">
    <ToggleButton
      class="cardToggleButton"
      onclick={() => useLocalSettingsStore.toggleTripDetailCardOpen()}
      isOpen={useLocalSettingsStore.tripDetailCardOpen}
      title="Toggle trip details"
    />
    <Card>
      <TotalExpense />

      {#if useLocalSettingsStore.tripDetailCardOpen}
        <div class="space"></div>
        <hr />
        <Budget />
        <hr />
        <TripDate />
        <hr />
        <ExportTrip />
      {/if}
    </Card>
  </div>
</StackItem>

<style lang="scss">
  .TripDetailCard {
    position: relative;

    :global(.Card) {
      padding-left: 0;
      padding-right: 0;
    }

    :global(.cardToggleButton) {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    hr {
      border: 0;
      border-top: 1px solid var(--color-grey-500);
      margin-top: 0;
      margin-bottom: 8px;
    }

    .space {
      height: 16px;
    }
  }
</style>
