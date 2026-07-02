<script lang="ts">
  import { Grid } from '@flightlesslabs/dodo-ui';
  import StatsCard from '../../StatsCard/StatsCard.svelte';
  import DateSummary from './DateSummary.svelte';
  import Total from './Total.svelte';
  import TripName from './TripName.svelte';
  import ExpensesCount from './ExpensesCount.svelte';
</script>

<div class="SummaryCard">
  <StatsCard title="Trip summary">
    <TripName />
    <Grid gap={2}>
      <ExpensesCount />
      <DateSummary />
      <Total />
    </Grid>
  </StatsCard>
</div>

<style lang="scss">
</style>
