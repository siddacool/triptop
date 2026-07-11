<script>
  import EnableCurrencyConversion from './EnableCurrencyConversion.svelte';
  import CurrencySettings from './CurrencySettings/CurrencySettings.svelte';
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import FieldHeader from '$lib/components/ui/FieldHeader/FieldHeader.svelte';
  import Example from './Example.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
</script>

<Column>
  <Grid gap={2}>
    <Column>
      <FieldHeader>Currency conversion</FieldHeader>
    </Column>

    <EnableCurrencyConversion />
    {#if settingsStore.settings.enableCurrencyConversion}
      <CurrencySettings />
      <Example />
    {/if}
  </Grid>
</Column>
