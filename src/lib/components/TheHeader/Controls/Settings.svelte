<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
</script>

<Button
  aria-label="Settings"
  class="SiteSettingsButton"
  variant="text"
  roundness="pill"
  title="Settings"
  href="/settings"
  compact
  color="neutral"
  background="none"
>
  <Icon icon="material-symbols:settings-outline" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.SiteSettingsButton) {
    font-size: 1.4rem;
  }
</style>
