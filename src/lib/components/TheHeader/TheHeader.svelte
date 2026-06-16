<script>
  import { Card } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls/Controls.svelte';
  import Logo from './Logo.svelte';
</script>

<header class="TheHeader">
  <div class="box">
    <Card class="TheHeaderCard" roundness={2}>
      <Logo />
      <Controls />
    </Card>
  </div>
</header>

<style lang="scss">
  .TheHeader {
    background-color: var(--dodo-color-neutral-100);
    overflow: auto;
    z-index: 200;
    position: relative;

    .box {
      height: 100%;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      overflow: auto;
    }

    :global(.TheHeaderCard) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
      padding: 0 var(--dodo-ui-space);

      @media (min-width: 600px) {
        height: 60px;
        margin: calc(var(--dodo-ui-space) * 2) 0;
        padding: 0 calc(var(--dodo-ui-space) * 2);
      }
    }
  }

  :global(.dodo-theme--dark .TheHeader) {
    background-color: var(--dodo-color-neutral-50);
  }
</style>
