<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface ChipClikableProps extends SvelteComponentProps {
    class?: string;
    title?: string;
    onclick?: (e: MouseEvent) => void;
    name?: string;
    disabled?: boolean;
  }

  const {
    children,
    title,
    class: className = '',
    name,
    onclick,
    disabled = false,
  }: ChipClikableProps = $props();
</script>

<button class={`ChipClikable ${className}`} {title} {onclick} {name} {disabled}>
  {#if children}
    {@render children()}
  {/if}
</button>

<style lang="scss">
  .ChipClikable {
    margin: 0;
    padding: 0 16px;
    border: 0;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 20px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--size-ui-element-height);
    letter-spacing: 0.3px;
    font-family: inherit;

    &[disabled] {
      cursor: not-allowed;
      background-color: var(--color-grey-200);
      color: var(--color-grey-font-400);
    }
  }
</style>
