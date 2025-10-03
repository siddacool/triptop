<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Confirm from './Confirm.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Confirm,
    tags: ['autodocs'],
  });

  let open1 = $state(false);
  let open2 = $state(false);
</script>

<Story name="Default" asChild>
  <div>
    <Button onclick={() => (open1 = true)}>Open</Button>
    <Confirm
      bind:open={open1}
      onaccept={() => console.log('onaccept')}
      onreject={() => console.log('onaccept')}
    >
      Do you confirm the prompt?
    </Confirm>
  </div>
</Story>

<Story name="CustomTitle" asChild>
  <div>
    <Button onclick={() => (open2 = true)}>Open CustomTitle</Button>
    <Confirm bind:open={open2}>
      {#snippet title()}
        Custom Confirm title
      {/snippet}

      Do you confirm the prompt?
    </Confirm>
  </div>
</Story>
