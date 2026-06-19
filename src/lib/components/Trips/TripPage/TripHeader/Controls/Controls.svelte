<script>
  import EditTrip from './EditTrip.svelte';
  import ExportTrip from './ExportTrip/ExportTrip.svelte';
</script>

<div class="Controls">
  <ExportTrip />
  <EditTrip />
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
