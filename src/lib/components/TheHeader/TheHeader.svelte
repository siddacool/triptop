<script>
  import Controls from './Controls/Controls.svelte';
  import Logo from './Logo.svelte';
</script>

<header class="TheHeader">
  <div class="box">
    <Logo />
    <Controls />
  </div>
</header>

<style lang="scss">
  .TheHeader {
    height: 55px;
    background-color: var(--dodo-color-white);
    border-bottom: 1px solid var(--dodo-color-neutral-300);
    padding: 0 calc(var(--dodo-ui-space) * 2);

    @media (min-width: 600px) {
      height: 60px;
      padding: 0 calc(var(--dodo-ui-space) * 3);
    }

    .box {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      justify-content: space-between;
    }
  }

  :global(.dodo-theme--dark .TheHeader) {
    background-color: var(--dodo-color-neutral-200);
  }
</style>
