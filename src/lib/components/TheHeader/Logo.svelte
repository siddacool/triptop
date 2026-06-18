<script>
  import { resolve } from '$app/paths';
</script>

<div class="Logo">
  <a href={resolve('/trips')}>
    <img src="/favicon-96x96.png" alt="Triptop logo" />
    <span class="text">Triptop</span>
  </a>
</div>

<style lang="scss">
  .Logo {
    height: 100%;

    .text {
      font-size: 1.3rem;
      font-weight: 500;

      @media (min-width: 600px) {
        font-size: 1.6rem;
      }
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
      width: 35px;
      height: auto;
      margin-right: var(--dodo-ui-space);
      border-radius: 4px;
    }
  }
</style>
