<script>
  import { resolve } from '$app/paths';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';
</script>

<div class="Logo">
  <a href={resolve('/trips')}>
    {#if useThemeStore.theme === 'dark'}
      <img src="/assets/social/logo-dark.svg" alt="Triptop logo dark" />
    {:else}
      <img src="/assets/social/logo.svg" alt="Triptop logo" />
    {/if}

    <span class="text">Triptop</span>
  </a>
</div>

<style lang="scss">
  .Logo {
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;

    .text {
      font-size: inherit;
    }

    a {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      color: var(--dodo-color-neutral-700);
      height: 100%;
    }

    img {
      display: inline-flex;
      width: 33px;
      height: auto;
      margin-right: 8px;
      border-radius: 12px;
    }
  }
</style>
