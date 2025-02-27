<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import Icon from '@iconify/svelte';
  import Budget from './Budget.svelte';
  import TotalExpense from './TotalExpense.svelte';
  import TripDate from './TripDate.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import ExportTrip from './ExportTrip.svelte';
</script>

<StackItem>
  <div class="TripDetailCard">
    <Button
      compact
      class="cardToggleButton"
      onclick={() => useLocalSettingsStore.toggleTripDetailCardOpen()}
      variant="inert"
    >
      {#if useLocalSettingsStore.tripDetailCardOpen}
        <Icon icon="material-symbols:keyboard-arrow-up-rounded" />
      {:else}
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
      {/if}
    </Button>
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
      width: 40px;
      height: 40px;
      min-width: initial;
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
      height: 20px;
    }
  }
</style>
