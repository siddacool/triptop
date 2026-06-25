<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FieldHeader from './FieldHeader.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: FieldHeader,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">Settings</Story>
