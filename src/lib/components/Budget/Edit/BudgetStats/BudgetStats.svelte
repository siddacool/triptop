<script lang="ts">
  import StatsCard from '$lib/components/StatsCard/StatsCard.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import Amount from './Amount.svelte';
  import PaymentMode from './PaymentMode.svelte';
  import Progress from './Progress.svelte';
</script>

<StackItem>
  <StatsCard>
    <Amount />
    <PaymentMode />
    <Progress />
  </StatsCard>
</StackItem>
