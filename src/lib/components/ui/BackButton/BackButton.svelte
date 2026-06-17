<script lang="ts" module>
  export type BackButtonProps = {
    href: string;
  };
</script>

<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  let { href }: BackButtonProps = $props();
</script>

<div class="BackButton">
  <Button {href} roundness="pill" class="BackButtonButton" variant="text" aria-label="Back button">
    <Icon icon="lets-icons:back" />
  </Button>
</div>

<style lang="scss">
  .BackButton {
    display: inline-flex;

    :global(.BackButtonButton) {
      font-size: 1.5rem;
    }
  }
</style>
