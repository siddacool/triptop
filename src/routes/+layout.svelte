<script lang="ts">
  import GlobalContainer from '$lib/components/GlobalContainer';
  import { useSilkStore } from '$lib/stores/silk/silk.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();

  $effect(() => {
    async function fetchData() {
      try {
        await useSilkStore.init();
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  });
</script>

<GlobalContainer />

<div>
  {#if children}
    {@render children()}
  {/if}
</div>
