<script lang="ts">
  import { Column } from '@flightlesslabs/dodo-ui';
  import { Checkbox } from '@flightlesslabs/dodo-ui-bits';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
</script>

<Column>
  <Checkbox
    checked={useSettingsStore.settings.enableCurrencyConversion}
    name="homeCurrency"
    id="homeCurrency"
    onCheckedChange={(val) =>
      useSettingsStore.updateSettings({
        enableCurrencyConversion: val,
      })}
    color="primary"
    variant="solid"
  >
    Enable currency conversion
  </Checkbox>
</Column>
