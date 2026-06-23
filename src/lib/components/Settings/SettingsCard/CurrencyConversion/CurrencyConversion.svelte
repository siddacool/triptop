<script>
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import SettingsAccordianItem from '../SettingsAccordianItem.svelte';
  import EnableCurrencyConversion from './EnableCurrencyConversion.svelte';
  import HomeCurrency from './HomeCurrency.svelte';
  import Locale from './Locale.svelte';
</script>

<SettingsAccordianItem title="Currency conversion" value="currency-conversion">
  <EnableCurrencyConversion />

  {#if useSettingsStore.settings.enableCurrencyConversion}
    <HomeCurrency />
    <Locale />
  {/if}
</SettingsAccordianItem>
