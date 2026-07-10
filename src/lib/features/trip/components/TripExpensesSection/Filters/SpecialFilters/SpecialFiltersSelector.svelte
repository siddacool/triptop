<script lang="ts">
  import ExpenseFilter from '$lib/features/expense/components/ExpenseFilter/ExpenseFilter.svelte';
  import { updateTripPageSpecialFiltersSelector } from '$lib/features/trip/logic/page.svelte';
  import { tripPageStore } from '$lib/features/trip/store/page.svelte';

  async function handleClick() {
    const filterSelectorCondition = !tripPageStore.showSpecialFiltersSelector;

    updateTripPageSpecialFiltersSelector(filterSelectorCondition);
  }
</script>

{#if tripPageStore.showSpecialFiltersSelector}
  <div class="SpecialFiltersSelector">
    <ExpenseFilter onclear={handleClick} onconfirm={handleClick} onclose={handleClick} />
  </div>
{/if}
