<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FieldValue from './FieldValue.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: FieldValue,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ label: 'Name:' }}>Trip to Pondicherry</Story>
