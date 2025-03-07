<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import Accordian from './ui-framework/Layout/Accordian.svelte';

  interface FilterProps extends SvelteComponentProps {
    onclick?: (e: MouseEvent) => void;
    class?: string;
    open?: boolean;
    isFilter?: boolean;
  }

  const {
    children,
    onclick,
    class: className = '',
    open = false,
    isFilter = false,
  }: FilterProps = $props();
</script>

<Accordian title="Filters" {open} {onclick} class={`Filters ${className}`}>
  {#if children}
    {@render children()}
  {/if}

  {#snippet headerContent()}
    {#if isFilter}
      <span class="filterActive"></span>
    {/if}
  {/snippet}
</Accordian>

<style lang="scss">
  .filterActive {
    display: inline-flex;
    width: 10px;
    height: 10px;
    background-color: var(--color-danger-500);
    border-radius: 50%;
  }
</style>
