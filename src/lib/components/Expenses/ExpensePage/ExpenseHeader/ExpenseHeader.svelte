<script>
  import { page } from '$app/state';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import Controls from './Controls/Controls.svelte';

  const tripId = page.params.tripId;
</script>

<PageHeadingNav class="TripHeader" href={`/trips/${tripId}/`}>
  {useExpenseStore?.expense?.name || ''}

  {#snippet controls()}
    <Controls />
  {/snippet}
</PageHeadingNav>
