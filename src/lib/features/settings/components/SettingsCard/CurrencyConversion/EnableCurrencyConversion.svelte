<script lang="ts">
  import { Column } from '@flightlesslabs/dodo-ui';
  import { Switch } from '@flightlesslabs/dodo-ui-bits';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { updateSettings } from '$lib/features/settings/logic/index.svelte';
</script>

<Column>
  <Switch
    checked={settingsStore.settings.enableCurrencyConversion}
    name="enableCurrencyConversion"
    id="enableCurrencyConversion"
    onCheckedChange={(val) =>
      updateSettings({
        enableCurrencyConversion: val,
      })}
    color="primary"
    variant="solid"
  >
    Enable currency conversion
  </Switch>
</Column>
