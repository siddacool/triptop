<script lang="ts">
  import '@flightlesslabs/dodo-ui/styles/global/index.scss';
  import '@flightlesslabs/dodo-ui/styles/components.scss';
  // Addon (dodo-ui-bits)
  import '@flightlesslabs/dodo-ui-bits/styles/main.scss';
  // Addon (dodo-ui-date)
  import '@flightlesslabs/dodo-ui-date/styles/main.css';
  import { ModalManager, ToastManager } from '@flightlesslabs/dodo-ui-bits';
  import { Theme } from '@flightlesslabs/dodo-ui';

  let { children } = $props();
</script>

<main>
  {@render children()}
</main>

<Theme global type="auto" />
<ToastManager />
<ModalManager />

<style lang="scss">
  :global(html) {
    font-family: 'Zalando Sans', sans-serif;
    font-optical-sizing: auto;
    font-size: 16px;
  }
</style>
