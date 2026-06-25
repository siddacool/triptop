<script>
  import Controls from './Controls/Controls.svelte';
  import Title from './Title.svelte';
</script>

<div class="TripDetails">
  <Title />
  <Controls />
</div>

<style lang="scss">
  .TripDetails {
    margin-top: 0;
    margin-bottom: calc(var(--dodo-ui-space) * 2);
    display: flex;
    align-items: center;
    width: 100%;
    padding: calc(var(--dodo-ui-space) * 1) 0;
  }
</style>
