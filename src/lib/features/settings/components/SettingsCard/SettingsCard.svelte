<script lang="ts">
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import UserInterface from './UserInterface/UserInterface.svelte';
  import CurrencyConversion from './CurrencyConversion/CurrencyConversion.svelte';
  import Divider from '$lib/components/ui/Divider/Divider.svelte';
</script>

<div class="SettingsCard">
  <Grid gap={2}>
    <UserInterface />
    <Column>
      <Divider />
    </Column>
    <CurrencyConversion />
  </Grid>
</div>

<style lang="scss">
  .SettingsCard {
    margin-top: calc(var(--dodo-ui-space) * 2);

    :global(.SettingsCardCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
