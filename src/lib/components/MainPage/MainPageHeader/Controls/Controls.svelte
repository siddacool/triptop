<script>
  import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<div class="Controls">
  <ThemeSwitch />
</div>

<style lang="scss">
  .Controls {
    display: flex;
    margin: 0 -2px;

    :global(.dodo-ui-Button) {
      margin: 0 2px;
    }
  }
</style>
