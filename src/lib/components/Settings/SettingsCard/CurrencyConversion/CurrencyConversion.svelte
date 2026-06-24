<script>
  import SettingsAccordianItem from '../SettingsAccordianItem.svelte';
  import EnableCurrencyConversion from './EnableCurrencyConversion.svelte';
  import CurrencySettings from './CurrencySettings/CurrencySettings.svelte';
</script>

<SettingsAccordianItem title="Currency conversion" value="currency-conversion">
  <EnableCurrencyConversion />
  <CurrencySettings />
</SettingsAccordianItem>
