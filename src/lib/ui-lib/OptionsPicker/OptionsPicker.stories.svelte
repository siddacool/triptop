<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import OptionsPicker, { optionsPickerTypeArray } from './OptionsPicker.svelte';
  import type { StoryBookArgTypes } from '../../../storybook-types';

  export const storyOptionsPickerArgTypes: StoryBookArgTypes = {
    type: {
      control: { type: 'select' },
      options: optionsPickerTypeArray,
    },
  };

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: OptionsPicker,
    tags: ['autodocs'],
    args: {
      options: [
        { value: 'FOOD', label: 'Food' },
        { value: 'SHOPPING', label: 'Shopping' },
        { value: 'TOUR', label: 'Tour' },
        { value: 'TRANSPORT', label: 'Transport' },
        { value: 'STAY', label: 'Stay' },
        { value: 'FLIGHT', label: 'Flight' },
        { value: 'ENTERTAINMENT', label: 'Entertainment' },
        { value: 'MART', label: 'Mart' },
        { value: 'OTHER', label: 'Misc' },
      ],
    },
  });
</script>

<Story name="single" args={{ name: 'list-1', type: 'single' }} />

<Story name="multiple" args={{ name: 'list-2', type: 'multiple' }} />

<Story
  name="clearAll"
  args={{ name: 'list-3', type: 'multiple', onclear: () => {}, value: ['TRANSPORT'] }}
/>
