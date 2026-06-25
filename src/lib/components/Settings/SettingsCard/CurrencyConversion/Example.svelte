<script>
  import { Column, Money } from '@flightlesslabs/dodo-ui';
  import FieldMessage from '$lib/components/ui/FieldMessage/FieldMessage.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
</script>

<Column>
  <FieldMessage size="small" class="CurrencySettingsExample">
    Home currency format. e.g.
    <b>
      <Money
        value={500000}
        currency={useSettingsStore.settings.homeCurrency}
        locale={useSettingsStore.settings.locale}
      />
    </b>
  </FieldMessage>
</Column>

<style lang="scss">
  b {
    font-weight: 500;
  }

  :global(.CurrencySettingsExample) {
    padding-top: 0;
    margin-top: calc(var(--dodo-ui-space) * -1);
  }
</style>
