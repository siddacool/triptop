<script lang="ts">
  import ExpensList from './ExpensList.svelte';
  import TopControls from './TopControls/TopControls.svelte';
</script>

<div class="TripExpensesSection">
  <TopControls />
  <ExpensList />
</div>

<style lang="scss">
  .TripExpensesSection {
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
