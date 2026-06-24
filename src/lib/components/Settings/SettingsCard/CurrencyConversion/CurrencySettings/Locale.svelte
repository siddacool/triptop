<script lang="ts">
  import { Column, FormField } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { localeOptionsBrowser } from '$lib/stores/trip/types';

  const value = $derived(useSettingsStore.settings.locale);
</script>

<Column md={4}>
  <FormField label="Locale" for="local">
    <Select
      {value}
      options={localeOptionsBrowser}
      onValueChange={(val) =>
        useSettingsStore.updateSettings({
          locale: val,
        })}
      name="locale"
    />
  </FormField>
</Column>
