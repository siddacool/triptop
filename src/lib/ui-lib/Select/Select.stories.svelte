<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Select from './Select.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Select,
    tags: ['autodocs'],
    args: {
      options: [
        {
          value: 'Option1',
          label: 'Option 1',
        },
        {
          value: 'Option2',
          label: 'Option 2',
        },
        {
          value: 'Option3',
          label: 'Option 3',
        },
        {
          value: 'Option4',
          label: 'Option 4',
        },
      ],
    },
  });
</script>

<Story name="Default" />

<Story name="error" args={{ error: true }} />

<Story name="disabled" args={{ disabled: true }} />
