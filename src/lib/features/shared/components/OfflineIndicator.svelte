<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { networkConnectionStore } from '../store/network-connection.svelte';

  type Props = {
    class?: string;
  };

  const { class: className = '' }: Props = $props();

  const classes = $derived(['OfflineIndicator', className].filter(Boolean));

  function onclick() {
    modals.add('inform', {
      title: 'You are offline',
      description: 'You are not connected to the internet',
      modalProps: {
        acceptButtonProps: {
          label: 'OK',
        },
      },
    });
  }
</script>

{#if !networkConnectionStore.online}
  <div class={classes.join(' ')}>
    <Button
      aria-label="You are offline"
      class="OfflineIndicatorButton"
      variant="text"
      roundness="pill"
      title="You are offline"
      compact
      color="neutral"
      background="none"
      {onclick}
    >
      <Icon icon="wordpress:offline" />
    </Button>
  </div>
{/if}

<style lang="scss">
  .OfflineIndicator {
    :global(.dodo-ui-Button.size--normal.OfflineIndicatorButton) {
      font-size: 1.3rem;
    }
  }
</style>
