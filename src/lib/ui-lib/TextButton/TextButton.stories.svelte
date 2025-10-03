<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TextButton from './TextButton.svelte';
  import type { StoryBookArgTypes } from '../../../storybook-types';
  import { buttonTypeArray } from '../Button/Button.svelte';

  export const storyTextButtonArgTypes: StoryBookArgTypes = {
    type: {
      control: { type: 'select' },
      options: buttonTypeArray,
    },
  };

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: TextButton,
    tags: ['autodocs'],
    argTypes: storyTextButtonArgTypes,
  });
</script>

<!-- TextButton with default style -->
<Story name="Default">Click me!</Story>

<!-- Anchor Link styled like a TextButton -->
<Story name="Link TextButton" args={{ href: 'https://www.w3schools.com/tags/tag_a.asp' }}>
  Link
</Story>

<Story name="Disabled" args={{ disabled: true }}>Click me!</Story>
