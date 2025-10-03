<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SpecialText from './SpecialText.svelte';
  import type { StoryBookArgTypes } from '../../../storybook-types';

  export const storySpecialTextArgTypes: StoryBookArgTypes = {
    fontWeight: {
      control: { type: 'range', min: 200, max: 900 },
    },
    width: {
      control: { type: 'range', min: 75, max: 125 },
    },
    italic: {
      control: { type: 'boolean' },
    },
  };

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: SpecialText,
    tags: ['autodocs'],
    argTypes: storySpecialTextArgTypes,
    args: {
      italic: false,
      fontWeight: 400,
      width: 100,
    },
  });
</script>

<Story name="Default">This is a message</Story>

<Story name="italic" args={{ italic: true }}>This is a message</Story>

<Story name="font weight" args={{ fontWeight: 614 }}>This is a message</Story>

<Story name="width" args={{ width: 125 }}>This is a message</Story>
