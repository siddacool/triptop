<script lang="ts">
  import { Card, Grid } from '@flightlesslabs/dodo-ui';
  import Theme from './Theme.svelte';
</script>

<div class="SettingsCard">
  <Card class="SettingsCardCard" shadow={0} outline>
    <Grid gap={2}>
      <Theme />
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
