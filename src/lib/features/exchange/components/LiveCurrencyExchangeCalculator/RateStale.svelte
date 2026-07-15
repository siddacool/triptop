<script>
  import Callout from '$lib/components/ui/Callout/Callout.svelte';
</script>

<div class="RateStale">
  <Callout class="RateStale" color="warning">The exchange rates are outdated</Callout>
</div>

<style lang="scss">
  .RateStale {
    margin-bottom: calc(var(--dodo-ui-space) * 2);
    margin-top: calc(var(--dodo-ui-space) * -2);
    margin-right: calc(var(--dodo-ui-space) * -2);
    margin-left: calc(var(--dodo-ui-space) * -2);

    @media (min-width: 600px) {
      margin-top: 0;
      margin-right: 0;
      margin-left: 0;
    }

    :global(.Callout) {
      text-align: center;
    }
  }
</style>
