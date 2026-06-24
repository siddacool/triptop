<script>
  import { Money } from '@flightlesslabs/dodo-ui';
  import FieldMessage from '$lib/components/ui/FieldMessage/FieldMessage.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
</script>

<FieldMessage size="small">
  Home currency format. e.g.
  <b>
    <Money
      value={500000}
      currency={useSettingsStore.settings.homeCurrency}
      locale={useSettingsStore.settings.locale}
    />
  </b>
</FieldMessage>

<style lang="scss">
  b {
    font-weight: 500;
  }
</style>
