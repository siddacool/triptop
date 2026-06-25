<script lang="ts">
  import { Column } from '@flightlesslabs/dodo-ui';
  import { Switch } from '@flightlesslabs/dodo-ui-bits';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
</script>

<Column>
  <Switch
    checked={useSettingsStore.settings.enableCurrencyConversion}
    name="enableCurrencyConversion"
    id="enableCurrencyConversion"
    onCheckedChange={(val) =>
      useSettingsStore.updateSettings({
        enableCurrencyConversion: val,
      })}
    color="primary"
    variant="solid"
  >
    Enable currency conversion
  </Switch>
</Column>
