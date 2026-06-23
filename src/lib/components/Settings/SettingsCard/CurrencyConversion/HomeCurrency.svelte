<script lang="ts">
  import { Column, FormField } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { currencyOptions } from '$lib/stores/currency/types';
  import { type CurrencyCode } from '@flightlesslabs/currency';
</script>

<Column md={6}>
  <FormField label="Home Currency" for="homeCurrency">
    <Select
      options={currencyOptions}
      value={useSettingsStore.settings.homeCurrency}
      name="homeCurrency"
      onValueChange={(val) =>
        useSettingsStore.updateSettings({
          homeCurrency: val as CurrencyCode,
        })}
      searchable
      placeholder="Select home Currency. e.g INR"
    />
  </FormField>
</Column>
