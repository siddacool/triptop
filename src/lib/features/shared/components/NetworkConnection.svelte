<script lang="ts">
  import { browser } from '$app/environment';
  import { networkConnectionStore } from '../store/network-connection.svelte';

  const updateStatus = () => {
    networkConnectionStore.update();
  };

  $effect(() => {
    console.log(networkConnectionStore.online ? '🟢 Online' : '🔴 Offline');
  });

  $effect(() => {
    if (!browser) return;

    updateStatus();

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  });
</script>
