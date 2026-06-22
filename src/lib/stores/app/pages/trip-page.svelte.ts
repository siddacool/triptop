function createTripPageStore() {
  let showSpecailFiltersSelector: boolean = $state(false);

  return {
    get showSpecailFiltersSelector() {
      return showSpecailFiltersSelector;
    },
    toggleShowSpecailFiltersSelector() {
      showSpecailFiltersSelector = !showSpecailFiltersSelector;
    },
    reset() {
      showSpecailFiltersSelector = false;
    },
  };
}

export const useTripPageStore = createTripPageStore();
