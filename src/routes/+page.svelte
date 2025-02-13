<script lang="ts">
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';

  const mounted = $derived(useTripsStore.mounted ? true : false);
</script>

<title>Triptop - Travel budgeting app</title>

<h2><img src="web-app-manifest-192x192.png" alt="icon" /> Triptop</h2>

{#if mounted && useTripsStore.data.length}
  <ul>
    {#each useTripsStore.data as trip}
      <li>
        <a href={`/trips/${trip._id}`}>
          <Card>
            <h3>
              {trip.name}
            </h3>
          </Card>
        </a>
      </li>
    {/each}
  </ul>
{/if}

<div class="CreateButtonSection">
  <AnchorButton href="/trips/create" variant="primary" compact>
    <Icon icon="mdi:plus" />
  </AnchorButton>
</div>

<style lang="scss">
  h2 {
    font-size: 2.5rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    :global(.Card) {
      &:hover {
        background-color: var(--color-primary-100);
      }
    }
  }

  li {
    display: block;
    padding: 0;
    margin: 0;
    margin-bottom: 16px;
  }

  a {
    display: block;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
  }

  .CreateButtonSection {
    margin-top: 16px;
    text-align: center;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    opacity: 0.8;
    border: 1px solid var(--color-primary-300);
  }
</style>
