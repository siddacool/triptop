<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from './Button.svelte';

  interface ToggleButtonProps {
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    name?: string;
    title?: string;
    class?: string;
    isOpen?: boolean;
  }

  const {
    disabled,
    onclick,
    title,
    class: className = '',
    name,
    isOpen = false,
  }: ToggleButtonProps = $props();
</script>

<div class={`ToggleButton ${className}`}>
  <Button compact class="ToggleButton__Button" {onclick} {title} {name} {disabled} variant="inert">
    {#if isOpen}
      <Icon icon="material-symbols:keyboard-arrow-up-rounded" />
    {:else}
      <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
    {/if}
  </Button>
</div>

<style lang="scss">
  .ToggleButton {
    display: inline-flex;

    :global(.ToggleButton__Button) {
      width: 40px;
      height: 40px;
      min-width: initial;
    }
  }
</style>
