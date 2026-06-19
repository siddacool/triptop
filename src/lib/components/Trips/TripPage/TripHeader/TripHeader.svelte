<script>
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Controls from './Controls/Controls.svelte';
</script>

<PageHeadingNav class="TripHeader" href="/trips">
  {useTripStore?.trip?.name || ''}

  {#snippet controls()}
    <Controls />
  {/snippet}
</PageHeadingNav>
