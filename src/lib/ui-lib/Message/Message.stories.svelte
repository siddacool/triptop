<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Message, { messageColorArray } from './Message.svelte';
  import type { StoryBookArgTypes } from '../../../storybook-types';

  export const storyMessageArgTypes: StoryBookArgTypes = {
    color: {
      control: { type: 'select' },
      options: messageColorArray,
    },
  };

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Message,
    tags: ['autodocs'],
    argTypes: storyMessageArgTypes,
  });
</script>

<Story name="Primary">This is a message</Story>

<Story name="Secondary" args={{ color: 'secondary' }}>This is a message</Story>

<Story name="Neutral" args={{ color: 'neutral' }}>This is a message</Story>

<Story name="Safe" args={{ color: 'safe' }}>This is a message</Story>

<Story name="Warning" args={{ color: 'warning' }}>This is a message</Story>

<Story name="Danger" args={{ color: 'danger' }}>This is a message</Story>
