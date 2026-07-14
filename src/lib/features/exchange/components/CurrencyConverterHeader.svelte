<script>
  import { page } from '$app/state';
  import ExpandedHeader from '$lib/components/ui/ExpandedHeader/ExpandedHeader.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';

  const tripId = page.params.tripId;
</script>

<ExpandedHeader class="CurrencyConverterHeader">
  <PageHeadingNav class="ExpenseDetailsHeaderNav" href={`/trips/${tripId}/`}>
    Currency converter
  </PageHeadingNav>
</ExpandedHeader>

<style lang="scss">
  :global(.CurrencyConverterHeader .ExpandedHeaderCard) {
    height: 60px;
    min-height: 60px;
    max-height: 60px;
  }
</style>
