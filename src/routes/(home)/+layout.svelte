<script lang="ts">
  import TheHeader from '$lib/components/TheHeader/TheHeader.svelte';
  import { clearActiveTrip } from '$lib/features/trip/logic/page.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    clearActiveTrip();
  });
</script>

<TheHeader />
{@render children()}
