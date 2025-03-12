<script lang="ts">
  import Icon from '@iconify/svelte';

  interface TagClearProps {
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    name?: string;
    title?: string;
    class?: string;
  }

  const { disabled = false, onclick, name, title, class: className = '' }: TagClearProps = $props();
</script>

<button class={`TagClear ${className}`} {disabled} {onclick} {name} {title}>
  <Icon icon="material-symbols:close-rounded" />
</button>

<style lang="scss">
  button {
    display: flex;
    background-color: var(--color-primary-100);
    padding: 0 14px;
    border-radius: 20px;
    height: 40px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: background-color 100ms;
    font-family: inherit;
    margin: 6px;
    border: 0;
    outline: 0;
    width: 60px;
    justify-content: center;
    font-size: 1.2rem;

    &:hover {
      background-color: var(--color-primary-200);
    }

    &:active {
      background-color: var(--color-primary-300);
    }

    &[disabled] {
      cursor: not-allowed;
      background-color: var(--color-grey-200);
      color: var(--color-grey-font-400);
    }
  }
</style>
