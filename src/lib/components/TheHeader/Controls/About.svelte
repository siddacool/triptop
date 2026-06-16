<script>
  import { Button } from '@flightlesslabs/dodo-ui';
  import { modals } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
</script>

<Button
  aria-label="About"
  class="About"
  variant="text"
  roundness="pill"
  title="About"
  onclick={() =>
    modals.add('inform', {
      title: 'What is Triptop?',
      description: 'Triptop is a simple, offline travel budgeting app.',
    })}
>
  <Icon icon="material-symbols:info-outline" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.About) {
    font-size: 1.6rem;
  }
</style>
