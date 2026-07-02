<script>
  import Category from './Category/Category.svelte';
  import Summary from './Summary/Summary.svelte';
</script>

<div class="StatsList">
  <Summary />
  <Category />
</div>

<style lang="scss">
  .StatsList {
    margin-top: calc(var(--dodo-ui-space) * -1);

    :global(.StatsCard) {
      margin-top: calc(var(--dodo-ui-space) * 3);
    }
  }
</style>
