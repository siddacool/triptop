<script>
  import SettingsAccordianItem from '../SettingsAccordianItem.svelte';
  import DateFormat from './DateFormat.svelte';
  import Locale from './Locale.svelte';
</script>

<SettingsAccordianItem title="Localization" value="localization">
  <DateFormat />
  <Locale />
</SettingsAccordianItem>
