<script lang="ts">
  import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import Amount from './Amount.svelte';
  import Category from './Category.svelte';
  import DateAndTime from './DateAndTime.svelte';
  import PaymentMode from './PaymentMode.svelte';
</script>

<StackItem>
  <div class="ExpenseTripStats">
    <StatsCard>
      <Amount />
      <Category />
      <PaymentMode />
      <DateAndTime />
    </StatsCard>
  </div>
</StackItem>
