<script lang="ts">
  import { Column, FormField, Grid } from '@flightlesslabs/dodo-ui';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import FieldMessage from '$lib/components/ui/FieldMessage/FieldMessage.svelte';
  import { createDate } from '$lib/utils/date-time/createDate';
  import { updateSettings } from '$lib/features/settings/logic/index.svelte';
  import { dateFormatOptions } from '$lib/features/settings/config';
  import type { DateFormatMode } from '$lib/features/settings/types';

  const dateExample = $derived(createDate('2026-06-18').format(settingsStore.settings.dateFormat));
</script>

<Column>
  <FormField label="Date format" for="dateFormat">
    <Grid>
      <Column lg={3}>
        <Select
          options={dateFormatOptions}
          value={settingsStore.settings.dateFormat}
          onValueChange={(val) => updateSettings({ dateFormat: val as DateFormatMode })}
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
