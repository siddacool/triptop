<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Icon from '@iconify/svelte';
  import H2 from '../ui-framework/Headings/H2.svelte';

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));
</script>

<StackItem>
  <header>
    <section>
      <AnchorButton href="/" compact variant="inert" class="BackButton">
        <Icon icon="lets-icons:back" />
      </AnchorButton>
      <H2>{targetTrip?.name}</H2>
    </section>
    <section>
      <AnchorButton href={`/${id}/edit`} variant="primary" compact>
        <Icon icon="material-symbols:edit" />
      </AnchorButton>
    </section>
  </header>
</StackItem>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    :global(.BackButton) {
      min-width: initial;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    section {
      display: flex;
      align-items: center;
    }
  }
</style>
