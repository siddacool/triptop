<script lang="ts">
  import '@flightlesslabs/colors/global.css';

  let { children } = $props();
</script>

<main>
  <div class="box">
    {@render children?.()}
  </div>
</main>

<style lang="scss">
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    font-family: 'Work Sans', serif;
    font-optical-sizing: auto;
    font-style: normal;
    color: var(--dodo-color-black);
    margin: 0;
    padding: 0;
  }

  main {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
  }

  .box {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }
</style>
