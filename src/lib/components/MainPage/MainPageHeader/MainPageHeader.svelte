<script>
  import ExpandedHeader from '$lib/components/ui/ExpandedHeader/ExpandedHeader.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import Controls from './Controls/Controls.svelte';
  import Logo from './Logo.svelte';
</script>

<ExpandedHeader>
  <PageHeadingNav class="MainPageHeader">
    <Logo />

    {#snippet controls()}
      <Controls />
    {/snippet}
  </PageHeadingNav>
</ExpandedHeader>
