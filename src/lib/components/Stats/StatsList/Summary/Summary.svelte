<script lang="ts">
  import { Card, Grid } from '@flightlesslabs/dodo-ui';
  import DateSummary from './DateSummary.svelte';
  import TripName from './TripName.svelte';
  import Details from './Details.svelte';
</script>

<div class="SummaryCard">
  <Card class="SummaryCardCard">
    <TripName />
    <Grid gap={2}>
      <DateSummary />
      <Details />
    </Grid>
  </Card>
</div>

<style lang="scss">
  .SummaryCard {
    :global(.SummaryCardCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
