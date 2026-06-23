<script lang="ts">
  import { Card } from '@flightlesslabs/dodo-ui';
  import { Accordion } from '@flightlesslabs/dodo-ui-bits';
  import UserInterface from './UserInterface/UserInterface.svelte';
  import Localization from './Localization/Localization.svelte';
  import CurrencyConversion from './CurrencyConversion/CurrencyConversion.svelte';

  let accordianValue: string[] = $state(['user-interface', 'localization', 'currency-conversion']);
</script>

<div class="SettingsCard">
  <Card class="SettingsCardCard" shadow={0} outline>
    <Accordion type="multiple" bind:value={accordianValue}>
      <UserInterface />
      <Localization />
      <CurrencyConversion />
    </Accordion>
  </Card>
</div>

<style lang="scss">
  .SettingsCard {
    margin-top: calc(var(--dodo-ui-space) * 2);

    :global(.SettingsCardCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
