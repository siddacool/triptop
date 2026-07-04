<script>
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { Column } from '@flightlesslabs/dodo-ui';
  import { page } from '$app/state';

  const tripId = page.params.tripId;
</script>

<Column>
  <PageHeadingNav class="ExpenseDetailsHeaderNav" href={`/trips/${tripId}/`}>
    Trip statistics
  </PageHeadingNav>
</Column>
