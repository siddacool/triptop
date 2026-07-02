<script>
  import SettingsCard from '$lib/components/Settings/SettingsCard/SettingsCard.svelte';
  import TheHeader from '$lib/components/TheHeader/TheHeader.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
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

<TheHeader />
<Box>
  <PageHeadingNav>Settings</PageHeadingNav>
  <SettingsCard />
</Box>
