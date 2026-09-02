<script>
  import { useThemeStore } from '@flightlesslabs/dodo-ui';
</script>

<div class="Logo">
  {#if useThemeStore.theme === 'dark'}
    <img src="/assets/social/logo-dark.svg" alt="Triptop logo dark" />
  {:else}
    <img src="/assets/social/logo.svg" alt="Triptop logo" />
  {/if}

  <h2 class="Title">Triptop</h2>
</div>

<style lang="scss">
  .Logo {
    display: flex;
    align-items: center;
    img {
      display: inline-flex;
      width: 50px;
      height: auto;
      border-radius: 50px;
    }
  }

  .Title {
    margin: 0;
    font-weight: 400;
    font-size: 2rem;
    margin: 0;
    color: var(--dodo-color-neutral-700);
    margin-left: calc(var(--dodo-ui-space) * 2);
  }
</style>
