<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
</script>

<Button
  href="https://github.com/siddacool/triptop"
  variant="text"
  outline
  target="_blank"
  class="AboutCardSupportLinksGithub"
  size="large"
>
  <div class="Icon">
    <Icon icon="ant-design:github-filled" />
  </div>
  Github
</Button>

<style lang="scss">
  :global(.AboutCardSupportLinksGithub .Icon) {
    display: inline-flex;
    margin-right: var(--dodo-ui-space);
    font-size: 1.5rem;
  }
</style>
