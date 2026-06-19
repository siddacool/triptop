<script>
  import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<div class="Controls">
  <ThemeSwitch />
</div>

<style lang="scss">
  .Controls {
    margin: 0 -4px;
    display: flex;
    margin-left: -56px;

    :global(.dodo-ui-Button) {
      margin: 0 4px;
    }
  }
</style>
