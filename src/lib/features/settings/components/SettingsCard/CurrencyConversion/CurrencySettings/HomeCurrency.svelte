<script lang="ts">
  import { Column, FormField } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { type CurrencyCode } from '@flightlesslabs/currency';
  import { currencyOptions } from '$lib/features/trip/config/currency';
  import { updateSettings } from '$lib/features/settings/logic/index.svelte';
</script>

<Column lg={5}>
  <FormField label="Home Currency:" for="homeCurrency">
    <Select
      options={currencyOptions}
      value={settingsStore.settings.homeCurrency}
      name="homeCurrency"
      onValueChange={(val) =>
        updateSettings({
          homeCurrency: val as CurrencyCode,
        })}
      searchable
      placeholder="Select home Currency. e.g INR"
    />
  </FormField>
</Column>
