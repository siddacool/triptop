<script>
  import PageHeadingNavControls from '$lib/components/ui/PageHeadingNavControls/PageHeadingNavControls.svelte';
  import AddExpense from './AddExpense.svelte';
  import CurrencyConverterLink from './CurrencyConverterLink.svelte';
  import TripOptions from './TripOptions/TripOptions.svelte';
</script>

<PageHeadingNavControls>
  <AddExpense />
  <CurrencyConverterLink />
  <TripOptions />
</PageHeadingNavControls>
