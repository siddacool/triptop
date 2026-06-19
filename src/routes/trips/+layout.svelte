<script lang="ts">
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

  <ToastManager clearAfterDuration={3000} alignmentY="bottom" alignmentX="center" limit={3} />
  <ModalManager />
</Theme>

<style lang="scss">
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
    max-width: 800px;
    margin: 0 auto;
    padding: calc(var(--dodo-ui-space) * 2);

    @media (min-width: 600px) {
      padding: calc(var(--dodo-ui-space) * 3);
    }
  }
</style>
