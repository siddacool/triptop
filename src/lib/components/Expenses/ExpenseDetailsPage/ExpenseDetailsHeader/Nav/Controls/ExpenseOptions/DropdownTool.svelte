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
  aria-label="Expense options"
  triggerProps={{
    title: 'Expense options',
    variant: 'text',
    roundness: 'full',
    compact: true,
    class: 'ExpenseDetailsPageExpenseOptionsButton',
    color: 'neutral',
    background: 'none',
  }}
>
  <Icon icon="tabler:menu-4" />

  {#snippet customMenu()}
    <DropdownMenu
      align="end"
      outline={useThemeStore.theme === 'dark' ? true : false}
      class="ExpenseDetailsPageExpenseOptions"
    >
      {@render children?.()}
    </DropdownMenu>
  {/snippet}
</Dropdown>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.ExpenseDetailsPageExpenseOptionsButton) {
    font-size: 1.5rem;
  }

  :global(.ExpenseDetailsPageExpenseOptions .Icon) {
    font-size: 1.4rem;
    margin-right: calc(var(--dodo-ui-space) * 1.8);
    display: inline-flex;
  }
</style>
