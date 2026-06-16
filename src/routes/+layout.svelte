<script lang="ts">
  import '@flightlesslabs/dodo-ui/styles/global/index.scss';
  import '@flightlesslabs/dodo-ui/styles/components.scss';
  // Addon (dodo-ui-bits)
  import '@flightlesslabs/dodo-ui-bits/styles/main.scss';
  // Addon (dodo-ui-date)
  import '@flightlesslabs/dodo-ui-date/styles/main.css';
  import { ModalManager, ToastManager } from '@flightlesslabs/dodo-ui-bits';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import TheHeader from '$lib/components/TheHeader/TheHeader.svelte';
  import Main from '$lib/components/Main/Main.svelte';

  let { children } = $props();
</script>

<Theme global class="Theme" type="auto">
  <div class="App">
    <TheHeader />

    <Main>
      <div class="box">
        {@render children()}
      </div>
    </Main>
  </div>

  <ToastManager />
  <ModalManager />
</Theme>

<style lang="scss">
  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    font-family: 'Zalando Sans', sans-serif;
    font-optical-sizing: auto;
    font-size: 16px;
  }

  :global(body) {
    margin: 0;
    height: 100vh;
    overflow: hidden;
  }

  :global(.Theme) {
    height: 100vh;
    overflow: hidden;
  }

  .App {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
  }

  .box {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--dodo-ui-space) calc(var(--dodo-ui-space) * 2);

    @media (min-width: 600px) {
      padding: calc(var(--dodo-ui-space) * 2) calc(var(--dodo-ui-space) * 3);
    }
  }
</style>
