<script>
  import LogoWithText from '../LogoWithText/LogoWithText.svelte';
  import Description from './Description.svelte';
  import LinkList from './LinkList/LinkList.svelte';
  import SupportLinks from './SupportLinks/SupportLinks.svelte';
  import Version from './Version.svelte';
</script>

<div class="AboutCard">
  <LogoWithText />
  <Version />
  <Description />
  <SupportLinks />
  <LinkList />
</div>

<style lang="scss">
  .AboutCard {
    margin-top: calc(var(--dodo-ui-space) * 2);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
