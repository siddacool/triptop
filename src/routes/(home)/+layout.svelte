<script lang="ts">
  import TheHeader from '$lib/components/TheHeader/TheHeader.svelte';

  let { children } = $props();
</script>

<TheHeader />
{@render children()}
