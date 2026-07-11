<script lang="ts">
  import { ExportTripType, type ExportTripTypeOption } from '$lib/features/trip/types/export';
  import Icon from '@iconify/svelte';

  type Props = {
    option: ExportTripTypeOption;
  };

  const { option }: Props = $props();
</script>

<span class="MenuIcon">
  {#if (option as ExportTripTypeOption).value === ExportTripType.JSON}
    <Icon icon="material-symbols:download" />
  {:else}
    <Icon icon="mdi:file-outline" />
  {/if}
</span>

<style lang="scss">
  .MenuIcon {
    font-size: 1.4rem;
    margin-right: calc(var(--dodo-ui-space) * 1.8);
    display: inline-flex;
  }
</style>
