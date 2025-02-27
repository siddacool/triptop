<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface StackProps extends SvelteComponentProps {
    space?: number;
  }

  const { space = 1, children }: StackProps = $props();

  const stackSpace = (12 * space) / 2;
</script>

<section
  class="Stack"
  style={`--Stack-space: ${stackSpace}px; --Stack-space-minus: -${stackSpace}px`}
>
  {#if children}
    {@render children()}
  {/if}
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    margin-top: var(--Stack-space-minus);
    margin-bottom: var(--Stack-space-minus);
  }
</style>
