<script lang="ts">
  import CurruncyExchangeOutdated from '$lib/components/Trips/CurruncyExchangeOutdated.svelte';
</script>

<div class="Callouts">
  <CurruncyExchangeOutdated />
</div>

<style lang="scss">
  .Callouts {
    &:empty {
      display: none;
    }

    :global(.Callout) {
      margin: var(--dodo-ui-space) 0;
    }
  }
</style>
