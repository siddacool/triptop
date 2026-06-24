<script lang="ts">
  import CurrencyExchangeOutdated from '$lib/components/Trips/CurrencyExchangeOutdated.svelte';
</script>

<div class="Callouts">
  <CurrencyExchangeOutdated />
</div>

<style lang="scss">
  .Callouts {
    &:empty {
      display: none;
    }
    margin-bottom: -16px;
  }
</style>
