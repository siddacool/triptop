<script lang="ts">
  import { page } from '$app/state';
  import FormLabel from '$lib/components/ui-framework/Form/shared/FormLabel.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));
</script>

<div class="TripStats">
  <Card>
    <ul>
      <li>
        <div class="TotalExpense">
          <FormLabel label="Total Expense" />

          <b>₹60000000</b>
        </div>
      </li>
      <li>
        <div class="StatsLabel">Budget</div>
        <div class="StatsValue">
          <a href={`/trips/${id}/budget`}>Add budget</a>
        </div>
      </li>
      <li>
        <div class="StatsLabel">Date</div>
        <div class="StatsValue">
          {getMoment(targetTrip?.startDate).format('D MMM YYYY')} - {getMoment(
            targetTrip?.endDate,
          ).format('D MMM YYYY')}
        </div>
      </li>
    </ul>
  </Card>
</div>

<style lang="scss">
  .TripStats {
    ul {
      display: block;
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      font-size: 1.05rem;
      border-bottom: 1px solid var(--color-grey-400);
      padding-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
        border-bottom: 0;
      }
    }

    .TotalExpense {
      b {
        font-size: 1.5rem;
        font-weight: 500;
      }
    }

    :global(.Card) {
      padding: 0;
    }

    .StatsValue {
      font-weight: 600;
      a {
        text-decoration: none;
        color: var(--color-primary-800);
      }
    }
  }
</style>
