<script lang="ts">
  import Icon from '@iconify/svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { Dropdown, type DropdownMenuOption } from '@flightlesslabs/dodo-ui-bits';
  import { useTripExportStore } from '$lib/stores/trip/export/export.svelte';
  import {
    ExportTripType,
    exportTripTypeOptions,
    type ExportTripTypeOption,
  } from '$lib/stores/trip/export/types';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';

  function handleSelect(valueRaw: DropdownMenuOption) {
    const value = valueRaw as ExportTripTypeOption;

    useTripExportStore.exportTrip(value.value);
  }
</script>

{#if useExpenseListStore.expenses.length}
  <Dropdown
    aria-label="Export trip"
    class="TripPageExportTrip"
    triggerProps={{
      title: 'Export trip',
      variant: 'text',
      roundness: 'full',
      compact: true,
      class: 'TripPageExportTripButton',
    }}
    menuProps={{
      align: 'end',
      outline: useThemeStore.theme === 'dark' ? true : false,
    }}
    options={exportTripTypeOptions}
    onselect={handleSelect}
  >
    <Icon icon="material-symbols:download" />

    {#snippet customMenuItemContent({ option })}
      <span class="ExportTripMenuIcon">
        {#if (option as ExportTripTypeOption).value === ExportTripType.JSON}
          <Icon icon="material-symbols:download" />
        {:else}
          <Icon icon="mdi:file-outline" />
        {/if}
      </span>

      {option.label}
    {/snippet}
  </Dropdown>
{/if}

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripPageExportTripButton) {
    font-size: 1.5rem;
  }

  .ExportTripMenuIcon {
    font-size: 1.4rem;
    margin-right: 8px;
    display: inline-flex;
  }
</style>
