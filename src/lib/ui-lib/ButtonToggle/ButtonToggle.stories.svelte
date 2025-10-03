<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonToggle from './ButtonToggle.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: ButtonToggle,
    tags: ['autodocs'],
    args: {
      options: [
        {
          label: 'Cash',
          value: 'cash',
        },
        {
          label: 'Card',
          value: 'card',
        },
      ],
    },
  });
</script>

<!-- ButtonToggle with default style -->
<Story name="Default" />

<Story name="Disabled" args={{ disabled: true }} />
