<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import GlobalContainer from '$lib/components/GlobalContainer';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();
</script>

<GlobalContainer />

<main>
  <Box>
    <div class="Enclosure">
      <div class="Content">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>
  </Box>
</main>

<style lang="scss">
  main {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--color-grey-50);
  }

  .Enclosure {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
</style>
