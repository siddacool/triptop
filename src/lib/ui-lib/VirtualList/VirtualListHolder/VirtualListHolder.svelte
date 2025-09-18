<script lang="ts" module>
  export interface VirtualListHolderProps {
    children?: Snippet;
    ref?: HTMLDivElement;
    class?: string;
    height: string;
  }
</script>

<script lang="ts">
  import './VirtualListHolder.style.scss';
  import type { Snippet } from 'svelte';

  let {
    children,
    class: className = '',
    ref = $bindable<HTMLDivElement>(),
    height,
  }: VirtualListHolderProps = $props();
</script>

<div
  class={['VirtualListHolder', className].join(' ')}
  bind:this={ref}
  style={`height: ${height};`}
>
  {@render children?.()}
</div>
