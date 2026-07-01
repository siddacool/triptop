<script lang="ts">
  import { exportTripTypeOptions, type ExportTripTypeOption } from '$lib/stores/trip/export/types';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';
  import { Dropdown } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import MenuIcon from './MenuIcon.svelte';

  type Props = {
    onselect: (val: ExportTripTypeOption) => void;
  };

  const { onselect }: Props = $props();
</script>

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
  menuItemProps={{
    outline: true,
  }}
  options={exportTripTypeOptions}
  onselect={(val) => onselect(val as ExportTripTypeOption)}
>
  <Icon icon="material-symbols:download" />

  {#snippet customMenuItemContent({ option })}
    <MenuIcon option={option as ExportTripTypeOption} />

    {option.label}
  {/snippet}
</Dropdown>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripPageExportTripButton) {
    font-size: 1.5rem;
  }
</style>
