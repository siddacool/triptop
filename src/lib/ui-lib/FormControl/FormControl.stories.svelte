<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FormControl from './FormControl.svelte';
  import DatePicker from '../DatePicker/DatePicker.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: FormControl,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" args={{ for: 'picker-1' }}>
  <DatePicker name="picker-1" />
</Story>

<Story name="Label" args={{ label: 'Date Picker', for: 'picker-2' }}>
  <DatePicker name="picker-2" />
</Story>

<Story name="ErrorMessage" args={{ errorMessage: 'This is error message', for: 'picker-3' }}>
  <DatePicker name="picker-3" />
</Story>
