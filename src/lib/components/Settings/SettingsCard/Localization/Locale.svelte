<script lang="ts">
  import { Column, FormField, Grid, Money } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import FieldMessage from '$lib/components/ui/FieldMessage/FieldMessage.svelte';
  import { localeOptionsBrowser } from '$lib/stores/trip/types';

  const value = $derived(useSettingsStore.settings.locale);
</script>

<Column>
  <FormField label="Locale" for="local">
    <Grid>
      <Column md={6}>
        <Select
          {value}
          options={localeOptionsBrowser}
          onValueChange={(val) =>
            useSettingsStore.updateSettings({
              locale: val,
            })}
          name="locale"
        />
      </Column>
    </Grid>

    <FieldMessage size="small">
      Format curruncies to your liking. e.g.
      <b>
        <Money value={500000} currency="USD" locale={value} />
      </b>
    </FieldMessage>
  </FormField>
</Column>

<style lang="scss">
  b {
    font-weight: 500;
  }
</style>
