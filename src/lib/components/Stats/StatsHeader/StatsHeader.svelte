<script>
  import ExpandedHeader from '$lib/components/ui/ExpandedHeader/ExpandedHeader.svelte';
  import { Grid } from '@flightlesslabs/dodo-ui';
  import Nav from './Nav/Nav.svelte';
</script>

<ExpandedHeader class="ExpenseDetailsHeader">
  <Grid gap={2}>
    <Nav />
  </Grid>
</ExpandedHeader>

<style lang="scss">
  :global(.ExpenseDetailsHeader .ExpandedHeaderCard) {
    height: 60px;
    min-height: 60px;
    max-height: 60px;
  }
</style>
