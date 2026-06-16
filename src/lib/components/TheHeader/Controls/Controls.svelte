<script>
  import About from './About.svelte';
  import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<div class="Controls">
  <About />
  <ThemeSwitch />
</div>

<style lang="scss">
  .Controls {
    margin: 0 -4px;
    display: flex;

    :global(button) {
      margin: 0 4px;
    }
  }
</style>
