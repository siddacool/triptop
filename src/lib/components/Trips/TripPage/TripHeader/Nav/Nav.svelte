<script>
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { Column } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls/Controls.svelte';
</script>

<Column>
  <PageHeadingNav class="TripHeaderNav" href="/trips">
    {#snippet controls()}
      <Controls />
    {/snippet}
  </PageHeadingNav>
</Column>
