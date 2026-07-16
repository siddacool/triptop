<script>
  import { page } from '$app/state';
  import ExpandedHeader from '$lib/components/ui/ExpandedHeader/ExpandedHeader.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import PageHeadingNavControls from '$lib/components/ui/PageHeadingNavControls/PageHeadingNavControls.svelte';
  import OfflineIndicator from '$lib/features/shared/components/OfflineIndicator.svelte';

  const tripId = page.params.tripId;
</script>

<ExpandedHeader class="CurrencyConverterHeader">
  <PageHeadingNav class="ExpenseDetailsHeaderNav" href={`/trips/${tripId}/`}>
    Currency converter

    {#snippet controls()}
      <PageHeadingNavControls>
        <OfflineIndicator />
      </PageHeadingNavControls>
    {/snippet}
  </PageHeadingNav>
</ExpandedHeader>

<style lang="scss">
  :global(.CurrencyConverterHeader .ExpandedHeaderCard) {
    height: 60px;
    min-height: 60px;
    max-height: 60px;
  }
</style>
