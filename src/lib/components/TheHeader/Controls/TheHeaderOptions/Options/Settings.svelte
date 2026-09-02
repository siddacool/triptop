<script>
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
</script>

<DropdownMenuItem
  onSelect={() => goto(resolve(`/settings`))}
  outline
  class="TheHeaderOptionsDropdownMenuItemSettings"
>
  <span class="Icon">
    <Icon icon="material-symbols:settings-outline" />
  </span>
  Settings
</DropdownMenuItem>

<style lang="scss">
  :global(.TheHeaderOptionsDropdownMenuItemSettings .Icon) {
    font-size: 1.3rem;
  }
</style>
