<script>
  import ExpandedHeader from '$lib/components/ui/ExpandedHeader/ExpandedHeader.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import Controls from './Controls/Controls.svelte';
  import Logo from './Logo.svelte';
</script>

<ExpandedHeader class="TheHeader">
  <PageHeadingNav class="MainPageHeader">
    <Logo />

    {#snippet controls()}
      <Controls />
    {/snippet}
  </PageHeadingNav>
</ExpandedHeader>

<style lang="scss">
  :global(.TheHeader) {
    height: 60px;
    min-height: 60px;
    max-height: 60px;
    position: sticky;
    top: 0;
    left: 0;
  }
</style>
