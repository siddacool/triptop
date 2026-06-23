<script lang="ts">
  import { Card } from '@flightlesslabs/dodo-ui';
  import { Accordion } from '@flightlesslabs/dodo-ui-bits';
  import UserInterface from './UserInterface/UserInterface.svelte';

  let accordianValue: string[] = $state(['user-interface']);
</script>

<div class="SettingsCard">
  <Card class="SettingsCardCard" shadow={0} outline>
    <Accordion type="multiple" bind:value={accordianValue}>
      <UserInterface />
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
