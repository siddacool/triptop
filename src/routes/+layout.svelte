<script lang="ts">
  import '@flightlesslabs/dodo-ui/styles/global/index.scss';
  import '@flightlesslabs/dodo-ui/styles/components.scss';
  // Addon (dodo-ui-bits)
  import '@flightlesslabs/dodo-ui-bits/styles/main.scss';
  // Addon (dodo-ui-date)
  import '@flightlesslabs/dodo-ui-date/styles/main.css';

  let { children } = $props();
</script>

{@render children()}

<style lang="scss">
  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    font-family: 'Zalando Sans', sans-serif;
    font-optical-sizing: auto;
    font-size: 16px;
  }

  :global([data-bits-floating-content-wrapper]) {
    z-index: 2000 !important;
  }
</style>
