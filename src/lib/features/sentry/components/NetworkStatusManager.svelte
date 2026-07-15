<script lang="ts">
  import { networkStatusStore } from '../store/network-status.svelte';

  const updateStatus = () => {
    networkStatusStore.updateStatus();
  };

  $effect(() => {
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  });
</script>
