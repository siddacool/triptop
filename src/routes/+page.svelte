<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import SilkList from '$lib/components/SilkList.svelte';
  import SilkUpdateTool from '$lib/components/SilkUpdateTool.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useCountStore } from '$lib/stores/count/count.svelte';
  import { useSilkStore } from '$lib/stores/silk/silk.svelte';

  const mounted = $derived(useSilkStore.mounted ? true : false);
</script>

{#if mounted}
  <main>
    <Box>
      <Stack space={2}>
        <StackItem>
          <h1>{useCountStore.count} <b>🍫</b></h1>
          <h2>Silks Pending</h2>
        </StackItem>
        <StackItem><SilkUpdateTool /></StackItem>
      </Stack>

      <br />
      <br />

      <SilkList />
    </Box>
  </main>
{/if}

<style lang="scss">
  main {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
  }

  h1 {
    font-size: 5rem;
    font-weight: 600;
    margin-bottom: 8px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    b {
      font-size: 2.6rem;
    }
  }

  h2 {
    font-weight: 500;
    text-align: center;
    font-size: 2rem;
    margin-top: 0;
    position: relative;
    top: -10px;
    margin-bottom: 50px;
  }
</style>
