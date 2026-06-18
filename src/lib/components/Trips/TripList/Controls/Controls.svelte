<script>
  import CreateTrip from './CreateTrip.svelte';
  // import ImportTrip from './ImportTrip.svelte';
</script>

<div class="Controls">
  <CreateTrip />
  <!-- <ImportTrip /> -->
</div>

<style lang="scss">
  .Controls {
    display: flex;
    flex-direction: column;
    margin-top: calc(var(--dodo-ui-space) * 2);

    :global(.dodo-ui-Button) {
      margin-bottom: calc(var(--dodo-ui-space) * 2);

      @media (min-width: 600px) {
        margin: 0 var(--dodo-ui-space);
        margin-bottom: 0;
      }
    }

    @media (min-width: 600px) {
      flex-direction: row;
      justify-content: center;
    }
  }
</style>
