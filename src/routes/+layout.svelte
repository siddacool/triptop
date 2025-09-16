<script lang="ts">
  import GlobalStyles from '$lib/components/GlobalStyles';
  import ThemeSetter from '$lib/components/ThemeSetter';

  let { children } = $props();
</script>

<GlobalStyles />
<ThemeSetter />
<main>
  <div class="box">
    {@render children?.()}
  </div>
</main>

<style lang="scss">
  main {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
    padding-bottom: 0;
  }

  .box {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }
</style>
