<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CalculatorButton from './CalculatorButton.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: CalculatorButton,
    tags: ['autodocs'],
    args: {
      value: '2',
      onclick: () => {},
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">2</Story>
