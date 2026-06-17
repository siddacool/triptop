<script lang="ts">
  import TopControls from './TopControls/TopControls.svelte';
</script>

<div class="TripExpensesSection">
  <TopControls />
</div>

<style lang="scss">
  .TripExpensesSection {
    margin-top: calc(var(--dodo-ui-space) * 2);

    @media (min-width: 600px) {
      margin-top: calc(var(--dodo-ui-space) * 3);
    }
  }
</style>
