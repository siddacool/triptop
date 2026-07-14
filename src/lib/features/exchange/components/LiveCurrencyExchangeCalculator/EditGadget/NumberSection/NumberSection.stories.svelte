<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NumberSection from './NumberSection.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: NumberSection,
    tags: ['autodocs'],
    args: {
      onclick: () => {},
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
