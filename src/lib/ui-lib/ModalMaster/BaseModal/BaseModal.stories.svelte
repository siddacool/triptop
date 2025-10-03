<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BaseModal from './BaseModal.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: BaseModal,
    tags: ['autodocs'],
  });

  let open1 = $state(false);
  let open2 = $state(false);
  let open3 = $state(false);
</script>

<Story name="Default" asChild>
  <div>
    <Button onclick={() => (open1 = true)}>Open</Button>
    <BaseModal bind:open={open1}>This is a Modal</BaseModal>
  </div>
</Story>

<Story name="WithTitle" asChild>
  <div>
    <Button onclick={() => (open2 = true)}>Open WithTitle</Button>
    <BaseModal bind:open={open2}>
      {#snippet title()}
        Modal title
      {/snippet}

      This is a Modal
    </BaseModal>
  </div>
</Story>

<Story name="WithControls" asChild>
  <div>
    <Button onclick={() => (open3 = true)}>Open WithControls</Button>
    <BaseModal bind:open={open3}>
      {#snippet title()}
        Modal title
      {/snippet}

      This is a Modal

      {#snippet controls()}
        <Button onclick={() => (open3 = false)}>Ok</Button>
      {/snippet}
    </BaseModal>
  </div>
</Story>
