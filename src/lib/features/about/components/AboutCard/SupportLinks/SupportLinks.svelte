<script lang="ts">
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import Github from './Github.svelte';
</script>

<div class="SupportLinks">
  <ControlSection class="AboutCardSupportLinks" controlsAlignment="center">
    <Github />
  </ControlSection>
</div>

<style lang="scss">
  .SupportLinks {
    margin-top: calc(var(--dodo-ui-space) * 3);
  }
</style>
