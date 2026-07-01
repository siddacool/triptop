<script>
  import ExpandedHeader from '$lib/components/ui/ExpandedHeader/ExpandedHeader.svelte';
  import { Grid } from '@flightlesslabs/dodo-ui';
  import Nav from './Nav/Nav.svelte';
  import ExpenseMainDetails from './ExpenseMainDetails/ExpenseMainDetails.svelte';
</script>

<ExpandedHeader class="ExpenseDetailsHeader">
  <Grid gap={2}>
    <Nav />
    <ExpenseMainDetails />
  </Grid>
</ExpandedHeader>

<style lang="scss">
  :global(.ExpenseDetailsHeader .ExpandedHeaderCard) {
    padding: calc(var(--dodo-ui-space) * 1) 0;
    padding-bottom: calc(var(--dodo-ui-space) * 2);
    border-bottom-left-radius: var(--dodo-ui-element-roundness-2);
    border-bottom-right-radius: var(--dodo-ui-element-roundness-2);
  }
</style>
