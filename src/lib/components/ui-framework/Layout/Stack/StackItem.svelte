<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type StackItemProps = SvelteComponentProps;

  const { children }: StackItemProps = $props();
</script>

<article class="StackItem">
  {#if children}
    {@render children()}
  {/if}
</article>

<style lang="scss">
  article {
    padding-top: var(--Stack-space);
    padding-bottom: var(--Stack-space);
  }
</style>
