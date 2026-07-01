<script lang="ts">
  import { useThemeStore } from '@flightlesslabs/dodo-ui';
  import { Dropdown, DropdownMenu } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<Dropdown
  aria-label="Trip options"
  triggerProps={{
    title: 'Trip options',
    variant: 'text',
    roundness: 'full',
    compact: true,
    class: 'TripPageTripOptionsButton',
    color: 'neutral',
    background: 'none',
  }}
>
  <Icon icon="tabler:menu-4" />

  {#snippet customMenu()}
    <DropdownMenu
      align="end"
      outline={useThemeStore.theme === 'dark' ? true : false}
      class="TripPageTripOptions"
    >
      {@render children?.()}
    </DropdownMenu>
  {/snippet}
</Dropdown>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripPageTripOptionsButton) {
    font-size: 1.5rem;
  }

  :global(.TripPageTripOptions .Icon) {
    font-size: 1.4rem;
    margin-right: calc(var(--dodo-ui-space) * 1.8);
    display: inline-flex;
  }
</style>
