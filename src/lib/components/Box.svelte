<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type BoxProps = SvelteComponentProps;

  const { children }: BoxProps = $props();
</script>

<div class="Box">
  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  @use '$lib/components/GlobalContainer/styles/mixins/media.scss' as *;

  div {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
    padding: 10px;
    padding-top: 0;
    height: 100vh;

    @include mediaLg {
      padding: 16px;
    }
  }
</style>
