<script lang="ts">
  import ExpenseFilter from '$lib/features/expense/components/ExpenseFilter/ExpenseFilter.svelte';
  import { useTripPageStore } from '$lib/stores/app/pages/trip-page.svelte';
</script>

{#if useTripPageStore.showSpecailFiltersSelector}
  <div class="SpecialFiltersSelector">
    <ExpenseFilter
      onclear={useTripPageStore.toggleShowSpecailFiltersSelector}
      onconfirm={useTripPageStore.toggleShowSpecailFiltersSelector}
      onclose={useTripPageStore.toggleShowSpecailFiltersSelector}
    />
  </div>
{/if}
