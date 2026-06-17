<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
  };

  let { children }: Props = $props();
</script>

<p class="Title">{@render children?.()}</p>

<style lang="scss">
  .Title {
    margin: 0;
    font-weight: 400;
    font-size: 0.95rem;
    margin-right: var(--dodo-ui-space);
    flex: 1;

    @media (min-width: 600px) {
      font-size: 1rem;
      margin-right: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
