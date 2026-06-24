<script lang="ts">
  import { Column, FormField, Grid } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { dateFormatOptions, type DateFormatMode } from '$lib/stores/settings/date-format/types';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import FieldMessage from '$lib/components/ui/FieldMessage/FieldMessage.svelte';
  import { createDate } from '@flightlesslabs/time-utils';

  const dateExample = $derived(
    createDate('2026-06-18').format(useSettingsStore.settings.dateFormat),
  );
</script>

<Column>
  <FormField label="Date format" for="dateFormat">
    <Grid>
      <Column md={5}>
        <Select
          options={dateFormatOptions}
          value={useSettingsStore.settings.dateFormat}
          onValueChange={(val) =>
            useSettingsStore.updateSettings({ dateFormat: val as DateFormatMode })}
          name="dateFormat"
        />
      </Column>
    </Grid>

    <FieldMessage size="small">
      Default formatting for the date. e.g.
      <b>{dateExample}</b>
    </FieldMessage>
  </FormField>
</Column>

<style lang="scss">
  b {
    font-weight: 500;
  }
</style>
