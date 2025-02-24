<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId;

  const name = $derived(useTripsStore.data.find((item) => item._id === tripId)?.name || '');
</script>

<header>
  <section>
    <AnchorButton href="/" compact variant="inert" class="BackButton">
      <Icon icon="lets-icons:back" />
    </AnchorButton>
    <h2>{name}</h2>
  </section>

  <AnchorButton compact href={`/${tripId}/edit`}>
    <Icon icon="material-symbols:edit" />
  </AnchorButton>
</header>

<style lang="scss">
  header {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    :global(.BackButton) {
      width: 44px;
      min-width: initial;
      border-radius: 50%;
      margin-right: 8px;
    }
  }

  h2 {
    margin: 0;
    font-weight: 500;
  }

  section {
    display: flex;
    align-items: center;
  }
</style>
