<script>
  import SettingsCard from '$lib/components/Settings/SettingsCard/SettingsCard.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<Box>
  <PageHeadingNav>Settings</PageHeadingNav>
  <SettingsCard />
</Box>
