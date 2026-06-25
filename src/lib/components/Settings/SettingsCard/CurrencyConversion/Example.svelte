<script>
  import { Column, Money } from '@flightlesslabs/dodo-ui';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
</script>

<Column>
  <div class="CurrencySettingsExample">
    e.g.
    <b>
      <Money
        value={500000}
        currency={useSettingsStore.settings.homeCurrency}
        locale={useSettingsStore.settings.locale}
      />
    </b>
  </div>
</Column>

<style lang="scss">
  .CurrencySettingsExample {
    color: var(--dodo-color-neutral-600);
    font-size: 1rem;

    b {
      font-weight: 500;
    }
  }
</style>
