<script>
  import { Column, Money } from '@flightlesslabs/dodo-ui';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
</script>

<Column>
  <div class="CurrencySettingsExample">
    e.g.
    <b>
      <Money
        value={500000}
        currency={settingsStore.settings.homeCurrency}
        locale={settingsStore.settings.locale}
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
