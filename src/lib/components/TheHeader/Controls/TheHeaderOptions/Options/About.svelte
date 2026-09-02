<script>
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
</script>

<DropdownMenuItem
  onSelect={() => goto(resolve(`/about`))}
  outline
  class="TheHeaderOptionsDropdownMenuItemAbout"
>
  <span class="Icon">
    <Icon icon="ix:about" />
  </span>
  About
</DropdownMenuItem>

<style lang="scss">
  :global(.TheHeaderOptionsDropdownMenuItemAbout .Icon) {
    font-size: 1.3rem;
  }
</style>
