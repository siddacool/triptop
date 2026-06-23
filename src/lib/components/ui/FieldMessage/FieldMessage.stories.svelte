<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FieldMessage from './FieldMessage.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: FieldMessage,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">Trip to Pondicherry</Story>
