<script>
  import { page } from '$app/state';
  import BackButton from '$lib/components/ui/BackButton/BackButton.svelte';
  import Controls from './Controls/Controls.svelte';
  import ExpenseName from './ExpenseName.svelte';

  const tripId = page.params.tripId;
</script>

<div class="ExpenseHeader">
  <BackButton href={`/trips/${tripId}/`} />
  <ExpenseName />
  <Controls />
</div>

<style lang="scss">
  .ExpenseHeader {
    display: flex;
    align-items: center;
  }
</style>
