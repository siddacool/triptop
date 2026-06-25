<script>
  import SettingsCard from '$lib/components/Settings/SettingsCard/SettingsCard.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
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

<WhiteMaterial>
  <Box>
    <PageHeadingNav href="/trips">Settings</PageHeadingNav>
    <SettingsCard />
  </Box>
</WhiteMaterial>
