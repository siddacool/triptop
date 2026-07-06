<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonGroup from './ButtonGroup.svelte';
  import { sortStageOptions } from '../Sort/Sort.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ButtonGroup,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ options: sortStageOptions, value: 'normal' }} />
