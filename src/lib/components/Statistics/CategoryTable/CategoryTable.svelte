<script lang="ts">
  import { page } from '$app/state';
  import CategoryList from '$lib/components/Statistics/CategoryTable/CategoryList';
  import PaymentModeList from '$lib/components/Statistics/CategoryTable/PaymentModeList';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));
</script>

<title>{targetTrip?.name}: Stats</title>

<StackItem>
  <table>
    <tbody>
      <CategoryList />
      <PaymentModeList />
    </tbody>
  </table>
</StackItem>

<style lang="scss">
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0;

    :global(tr) {
      font-size: 0.95rem;
      font-weight: 500;

      &:hover {
        background-color: var(--color-primary-100);
      }
    }

    :global(tr.header) {
      font-weight: 600;
      font-size: 1.2rem;

      &:hover {
        background-color: transparent;
      }
    }

    :global(td) {
      padding: 8px 5px;
      border-bottom: 1px solid var(--color-grey-400);
      vertical-align: baseline;
      position: relative;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
</style>
