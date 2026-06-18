<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ControlSection from './ControlSection.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ControlSection,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">
  <Button>Uno</Button>
  <Button>Dos</Button>
</Story>

<Story name="Controls alignment center" args={{ controlsAlignment: 'center' }}>
  <Button>Uno</Button>
  <Button>Dos</Button>
</Story>
