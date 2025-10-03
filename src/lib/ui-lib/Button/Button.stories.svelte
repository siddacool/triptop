<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button, { buttonColorArray, buttonTypeArray } from './Button.svelte';
  import type { StoryBookArgTypes } from '../../../storybook-types';
  import Icon from '@iconify/svelte';

  export const storyButtonArgTypes: StoryBookArgTypes = {
    type: {
      control: { type: 'select' },
      options: buttonTypeArray,
    },
    color: {
      control: { type: 'select' },
      options: buttonColorArray,
    },
  };

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Button,
    tags: ['autodocs'],
    argTypes: storyButtonArgTypes,
  });
</script>

<!-- Button with default style -->
<Story name="Default">Click me!</Story>

<Story name="Disabled" args={{ disabled: true }}>Click me!</Story>

<!-- Anchor Link styled like a Button -->
<Story name="Link Button" args={{ href: 'https://www.w3schools.com/tags/tag_a.asp' }}>Link</Story>

<Story name="Compact" args={{ 'aria-label': 'back button', compact: true }}>
  <Icon icon="lets-icons:back" />
</Story>

<Story name="Primary" args={{ color: 'primary' }}>Primary</Story>

<Story name="Secondary" args={{ color: 'secondary' }}>Secondary</Story>

<Story name="Safe" args={{ color: 'safe' }}>Safe</Story>

<Story name="Danger" args={{ color: 'danger' }}>Danger</Story>
