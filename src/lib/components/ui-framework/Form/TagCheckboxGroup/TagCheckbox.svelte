<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface TagCheckboxProps extends SvelteComponentProps {
    class?: string;
    onclick?: (e: MouseEvent) => void;
    name?: string;
    checked?: boolean;
  }

  const {
    children,
    class: className = '',
    name,
    onclick,
    checked = false,
  }: TagCheckboxProps = $props();
</script>

<label class={`TagCheckbox ${className}`}>
  <input type="checkbox" {onclick} {name} {checked} />

  <section>
    {#if children}
      {@render children()}
    {/if}
  </section>
</label>

<style lang="scss">
  .TagCheckbox {
    display: flex;
    flex-wrap: wrap;
    margin: 6px;
    position: relative;

    section {
      display: flex;
      background-color: var(--color-grey-200);
      padding: 0 14px;
      border-radius: 20px;
      height: 40px;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: background-color 100ms;
    }

    input {
      position: absolute;
      opacity: 0;
      z-index: -200;
      &:checked + section {
        background-color: var(--color-primary-200);
      }
    }
  }
</style>
