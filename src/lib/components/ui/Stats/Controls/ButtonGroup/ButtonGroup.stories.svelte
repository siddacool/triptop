<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonGroup from './ButtonGroup.svelte';
  import { levelStageOptions } from '../Levels/Levels.svelte';

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

<Story name="Default" args={{ options: levelStageOptions, value: 'normal' }} />
