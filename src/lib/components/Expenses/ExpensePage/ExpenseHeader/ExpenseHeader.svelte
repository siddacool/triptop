<script>
  import { page } from '$app/state';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import Controls from './Controls/Controls.svelte';

  const tripId = page.params.tripId;
</script>

<PageHeadingNav class="TripHeader" href={`/trips/${tripId}/`}>
  Expense details

  {#snippet controls()}
    <Controls />
  {/snippet}
</PageHeadingNav>
