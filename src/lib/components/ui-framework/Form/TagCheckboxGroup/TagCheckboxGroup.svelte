<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface TagCheckboxGroupProps extends SvelteComponentProps {
    class?: string;
    id?: string;
  }

  const { children, class: className = '', id }: TagCheckboxGroupProps = $props();
</script>

<div {id} class={`TagCheckboxGroup ${className}`}>
  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  .TagCheckboxGroup {
    display: flex;
    flex-wrap: wrap;
  }
</style>
