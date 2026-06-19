<script>
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';;
  import Controls from './Controls/Controls.svelte';
  import Logo from './Logo.svelte';
</script>

<PageHeadingNav class="MainPageHeader">
  <Logo />

  {#snippet controls()}
    <Controls />
  {/snippet}
</PageHeadingNav>
