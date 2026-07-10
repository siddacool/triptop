<script lang="ts">
  import { Column, FormField, Grid } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { dateFormatOptions, type DateFormatMode } from '$lib/stores/settings/date-format/types';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import FieldMessage from '$lib/components/ui/FieldMessage/FieldMessage.svelte';
  import { createDate } from '$lib/utils/date-time/createDate';

  const dateExample = $derived(
    createDate('2026-06-18').format(useSettingsStore.settings.dateFormat),
  );
</script>

<Column>
  <FormField label="Date format" for="dateFormat">
    <Grid>
      <Column lg={3}>
        <Select
          options={dateFormatOptions}
          value={useSettingsStore.settings.dateFormat}
          onValueChange={(val) =>
            useSettingsStore.updateSettings({ dateFormat: val as DateFormatMode })}
          name="dateFormat"
        />
      </Column>
    </Grid>

    <FieldMessage>
      e.g.
      <b>{dateExample}</b>
    </FieldMessage>
  </FormField>
</Column>

<style lang="scss">
  b {
    font-weight: 500;
  }
</style>
