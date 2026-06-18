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
    :global(.dodo-ui-Button) {
      margin: 0 4px;
    }
  }
</style>
