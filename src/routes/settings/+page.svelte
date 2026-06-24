<script>
  import SettingsCard from '$lib/components/Settings/SettingsCard/SettingsCard.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    useTripActivePageStore.reset();
  });
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<PageHeadingNav href="/trips">Settings</PageHeadingNav>
<SettingsCard />
