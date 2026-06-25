<script lang="ts">
  import { Card, Column, Grid } from '@flightlesslabs/dodo-ui';
  import UserInterface from './UserInterface/UserInterface.svelte';
  import Localization from './Localization/Localization.svelte';
  import CurrencyConversion from './CurrencyConversion/CurrencyConversion.svelte';
</script>

<div class="SettingsCard">
  <Card class="SettingsCardCard" shadow={0} outline>
    <Grid gap={2}>
      <UserInterface />
      <Column></Column>
      <Localization />
      <Column></Column>
      <CurrencyConversion />
    </Grid>
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
