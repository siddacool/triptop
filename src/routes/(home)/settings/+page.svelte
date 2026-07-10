<script>
  import Box from '$lib/components/ui/Box/Box.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import SettingsCard from '$lib/features/settings/components/SettingsCard/SettingsCard.svelte';
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<Box>
  <PageHeadingNav>Settings</PageHeadingNav>
  <SettingsCard />
</Box>
