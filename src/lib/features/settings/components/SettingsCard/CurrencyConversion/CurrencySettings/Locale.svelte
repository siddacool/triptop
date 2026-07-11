<script lang="ts">
  import { Column, FormField } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { localeOptionsBrowser } from '$lib/features/trip/config';
  import { updateSettings } from '$lib/features/settings/logic/index.svelte';

  const value = $derived(settingsStore.settings.locale);
</script>

<Column md={2}>
  <FormField label="Locale:" for="local">
    <Select
      {value}
      options={localeOptionsBrowser}
      onValueChange={(val) =>
        updateSettings({
          locale: val,
        })}
      name="locale"
    />
  </FormField>
</Column>
