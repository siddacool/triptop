<script lang="ts">
  import StackItem from '../../ui-framework/Layout/Stack/StackItem.svelte';
  import Stack from '../../ui-framework/Layout/Stack/Stack.svelte';
  import StartDate from './StartDate.svelte';
  import EndDate from './EndDate.svelte';
  import ResetDates from './ResetDates.svelte';
  import Total from './Total.svelte';
</script>

<StackItem>
  <div class="StatsDate">
    <Stack space={2}>
      <StartDate />
      <EndDate />
      <ResetDates />
      <StackItem />
      <Total />
    </Stack>
  </div>
</StackItem>

<style lang="scss">
  .StatsDate {
    margin-bottom: 16px;
  }
</style>
