<script>
  import SettingsCard from '$lib/components/Settings/SettingsCard/SettingsCard.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';

  import { onMount } from 'svelte';

  onMount(() => {
    useTripListStore.fetch();
  });
</script>

<svelte:head>
  <title>Trips</title>
</svelte:head>

<PageHeadingNav href="/trips">Settings</PageHeadingNav>
<SettingsCard />

<style lang="scss">
</style>
