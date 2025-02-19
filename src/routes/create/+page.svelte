<script lang="ts">
  import EditTrip from '$lib/components/Trip/Edit/EditTrip';
  import H2 from '$lib/components/ui-framework/Headings/H2.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';

  $effect(() => {
    useLocalSettingsStore.resetLastOpenTrip();
  });
</script>

<title>Create trip</title>

<Stack space={2}>
  <StackItem><H2>Create trip</H2></StackItem>
  <EditTrip />
</Stack>
