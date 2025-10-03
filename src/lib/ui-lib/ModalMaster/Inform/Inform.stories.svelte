<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Inform from './Inform.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Inform,
    tags: ['autodocs'],
  });

  let open1 = $state(false);
  let open2 = $state(false);
</script>

<Story name="Default" asChild>
  <div>
    <Button onclick={() => (open1 = true)}>Open</Button>
    <Inform bind:open={open1} onaccept={() => console.log('onaccept')}>
      Do you confirm the prompt?
    </Inform>
  </div>
</Story>

<Story name="CustomTitle" asChild>
  <div>
    <Button onclick={() => (open2 = true)}>Open CustomTitle</Button>
    <Inform bind:open={open2}>
      {#snippet title()}
        Custom Inform title
      {/snippet}

      Do you confirm the prompt?
    </Inform>
  </div>
</Story>
