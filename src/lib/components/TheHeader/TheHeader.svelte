<script>
  import { page } from '$app/state';
  import Controls from './Controls/Controls.svelte';
  import Logo from './Logo.svelte';

  const pageName = $derived(page.route.id === '/trips' ? 'home' : 'default');

  const classes = $derived(['TheHeader', `pageName--${pageName}`].filter(Boolean));
</script>

<header class={classes.join(' ')}>
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
    padding: 0 var(--dodo-ui-space);

    &.pageName--default {
      display: none;

      @media (min-width: 800px) {
        display: block;
      }
    }

    @media (min-width: 600px) {
      height: 60px;
      padding: 0 calc(var(--dodo-ui-space) * 2);
    }

    .box {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      max-width: 752px;
      margin: 0 auto;
    }
  }

  :global(.dodo-theme--dark .TheHeader) {
    background-color: var(--dodo-color-neutral-100);
    border-bottom-color: var(--dodo-color-neutral-400);
  }
</style>
