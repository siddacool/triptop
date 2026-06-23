<script lang="ts">
  import { Column, FormField, Money } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import FieldMessage from '$lib/components/ui/FieldMessage/FieldMessage.svelte';
  import { localeOptionsBrowser } from '$lib/stores/trip/types';

  const value = $derived(useSettingsStore.settings.locale);
</script>

<Column md={6}>
  <FormField label="Locale" for="local">
    <Select
      {value}
      options={localeOptionsBrowser}
      onValueChange={(val) =>
        useSettingsStore.updateSettings({
          locale: val,
        })}
      name="locale"
      disabled={!useSettingsStore.settings.homeCurrency}
    />

    {#if useSettingsStore.settings.homeCurrency}
      <FieldMessage size="small">
        Home currency format. e.g.
        <b>
          <Money value={500000} currency={useSettingsStore.settings.homeCurrency} locale={value} />
        </b>
      </FieldMessage>
    {/if}
  </FormField>
</Column>

<style lang="scss">
  b {
    font-weight: 500;
  }
</style>
