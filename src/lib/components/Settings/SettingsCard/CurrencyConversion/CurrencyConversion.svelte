<script>
  import EnableCurrencyConversion from './EnableCurrencyConversion.svelte';
  import CurrencySettings from './CurrencySettings/CurrencySettings.svelte';
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import FieldHeader from '$lib/components/ui/FieldHeader/FieldHeader.svelte';
  import Example from './Example.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
</script>

<Column>
  <Grid gap={2}>
    <Column>
      <FieldHeader>Currency conversion</FieldHeader>
    </Column>

    <EnableCurrencyConversion />
    {#if useSettingsStore.settings.enableCurrencyConversion}
      <CurrencySettings />
      <Example />
    {/if}
  </Grid>
</Column>
