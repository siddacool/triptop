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
    font-weight: 600;
    color: var(--dodo-color-neutral-600);
    letter-spacing: 0.2px;
    margin-bottom: calc(var(--dodo-ui-space) / 2);
  }

  :global(.dodo-theme--dark .TripListItem .Title) {
    color: var(--dodo-color-neutral-700);
  }
</style>
