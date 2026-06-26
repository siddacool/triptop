<script>
  import { resolve } from '$app/paths';
</script>

<div class="Logo">
  <a href={resolve('/trips')}>
    <img src="/favicon-96x96.png" alt="Triptop logo" class="LogoImageTriptop" />
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
      width: 27px;
      height: auto;
      margin-right: 6px;
      border-radius: 4px;

      @media (min-width: 600px) {
        width: 33px;
        margin-right: 8px;
      }
    }
  }

  :global(.dodo-theme--dark .LogoImageTriptop) {
    filter: brightness(95%);
  }
</style>
