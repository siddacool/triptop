<script lang="ts">
  import ExportCsv from './ExportCsv/ExportCsv.svelte';
  import ExportJson from './ExportJson.svelte';
</script>

<div class="ExportTrip">
  <ExportJson />
  <ExportCsv />
</div>

<style lang="scss">
  .ExportTrip {
    padding: 20px 20px;
    padding-bottom: 32px;
  }
</style>
