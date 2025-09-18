<script lang="ts" module>
  export interface VirtualListItemProps {
    children?: Snippet;
    ref?: HTMLDivElement;
    class?: string;
  }
</script>

<script lang="ts">
  import './VirtualListItem.style.scss';
  import type { Snippet } from 'svelte';

  let {
    children,
    class: className = '',
    ref = $bindable<HTMLDivElement>(),
  }: VirtualListItemProps = $props();
</script>

<div class={['VirtualListItem', className].join(' ')} bind:this={ref}>{@render children?.()}</div>
