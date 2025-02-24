<script lang="ts">
  import { page } from '$app/state';
  import { StatsItem } from '$lib/components/StatsCard';
  import BudgetProgress from '../../BudgetProgress.svelte';

  const id = page.params.budgetId;
</script>

<StatsItem>
  {#snippet label()}
    <BudgetProgress budgetId={id} />
  {/snippet}
</StatsItem>
