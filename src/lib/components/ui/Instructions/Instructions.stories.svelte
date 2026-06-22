<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Instructions from './Instructions.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Instructions,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, libero ab veritatis
  corporis suscipit commodi autem perferendis reiciendis explicabo quidem illo ullam tempore impedit
  inventore obcaecati quos ex iusto officiis.
</Story>
